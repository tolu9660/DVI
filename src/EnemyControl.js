

import { sceneEvents as events } from './EventsCenter.js';

import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */
export default class EnemyControl extends Phaser.GameObjects.Sprite {
  
    constructor(scene,x,y,type,idle,walk,imgIdle,imgWalk,img,startFrate,endFrate,rate){
        super(scene,x,y,type)
        console.log(scene);
        console.log(x);
        console.log(y);
        console.log(type);
        console.log(this.width);
        console.log(this.height);
        // this.setDepth(0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this,this.scene.groundLayer)

        this.scene = scene,
        // this.sprite = sprite;
        // this.scene.add.existing(this.sprite);
        // this.scene.physics.add.existing(this.sprite);
        this.idle=idle;
        this.walk= walk;
        this.imgIdle=imgIdle;
        this.imgWalk=imgWalk;
        this.img=img;
        this.starFrate= startFrate;
        this.endFrate= endFrate;
        this.rate=rate
        this.moveTime = 0;
        this.type=type;
        this.createEnemyAnimation();

        this.NewStateMachine = new NewStateMachine(this, type);

        this.NewStateMachine.addState('idle', {
          onEnter: this.idleOnEnter,
          onUpdate: this.idleOnUpdate
        })
        .addState('walk-left', {
          onEnter: this.walkLeftOnEnter,
          onUpdate: this.walkLeftOnUpdate,
        })
        .addState('walk-right',{
          onEnter: this.walkRightOnEnter,
          onUpdate: this.walkRightOnUpdate,
        })
        .addState('death')
        .setState('idle')
        
        
        

        events.on('alien-down', this.handleStomped, this)

    }
    idleOnEnter(){
      this.play('enemy-idle')
      console.log('pop');
      
      const r = Phaser.Math.Between(1, 100)
      if (r < 50) {
        console.log('pepop');
        this.NewStateMachine.setState('walk-left')
      } else {
        console.log('pepop2');
        
        this.NewStateMachine.setState('walk-right')
      }
    }
    idleOnUpdate(){
      // console.log(this.NewStateMachine.states);

        // this.NewStateMachine.setState('walk')
    }

    walkLeftOnEnter(){
      console.log('wl');
      this.moveTime = 0
      this.play('enemy-walk')
    }

    walkLeftOnUpdate(dt){
      this.moveTime += dt
      console.log(this);
      this.setVelocityX(-2)
      this.flipX = true;
      if (this.moveTime > 1500) {
        this.NewStateMachine.setState('walk-right');
      }
      
    }

    walkRightOnEnter(){
      this.moveTime = 0
      this.play('enemy-walk')
    }
    
    walkRightOnUpdate(dt){
      this.moveTime += dt
      console.log(this);
      this.setVelocityX(2)
      this.flipX = false;
      if (this.moveTime > 1500) {
        this.NewStateMachine.setState('walk-left');
      }
    }

    handleStomped(enemy) {
      console.log(enemy.type); 
      
      console.log('Este es el valor que guarda el atributo:');
      
      console.log(this.type);
      if (this!== enemy) {
        console.log('pepe'); 
      }
      switch(this.type){
        case 'alien':
          this.destroy();
          break;
        case 'alien1':
          this.destroy();
          break;
        case 'alien2':
          this.destroy();
          break;
        case 'alien3':
          this.destroy();
            break;
      }
      //this.sprite.destroy()
      this.NewStateMachine.setState('death')
    }

    update(dt){
      this.NewStateMachine.update(dt);
    }
    createEnemyAnimation(){   
      this.anims.create({
        key:this.idle,
        frames: [{key: this.img, frame: this.imgIdle}]
      })
      
      this.anims.create({
        key:this.walk,
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.img, {
          start: this.starFrate,
          end: this.endFrate,
          prefix: this.imgWalk,
          suffix: '.png'
        }),
        repeat: -1
      })
    }
}
