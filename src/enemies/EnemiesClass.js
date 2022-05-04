

import { sceneEvents as events } from '../EventsCenter.js';

import NewStateMachine from '../newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */
export default class EnemiesClass extends Phaser.Physics.Arcade.Sprite  {
  
    constructor(scene,x,y,type,idle,walk,imgIdle,imgWalk,img,startFrate,endFrate,rate){
        super(scene,x,y,type)

        // this.setDepth(0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this,this.scene.groundLayer)
        // this.body.setSize(this.width,this.height);
        // this.body.setOffset(this.width,-500);
        // this.body.setOffset(this.width,-500);
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
        .addState('death',{
          onEnter: this.deathOnEnter,
          onUpdate: this.deathOnUpdate,
        })
        
        
        

        events.on('alien-down', this.handleStomped, this)

    }
    deathOnEnter(){
      console.log('enemigo muerto');

      this.destroy()
    }


    idleOnEnter(){
      this.play('enemy-idle')
    
      const r = Phaser.Math.Between(1, 100)
      if (r < 50) {
        this.NewStateMachine.setState('walk-left')
      } else {          
        this.NewStateMachine.setState('walk-right')
      }
    }
    idleOnUpdate(){
      // console.log(this.NewStateMachine.states);

        this.NewStateMachine.setState('walk')
    }

    walkLeftOnEnter(){
      this.moveTime = 0
      this.play('enemy-walk')
      // console.log('Poisiton BE ' + this.body.y);
      // console.log('Poisiton E ' + this.y);
      // console.log('Poisiton DBE ' + this.body.deltaY());
    }

    walkLeftOnUpdate(dt){
      this.moveTime += dt
      this.setVelocityX(-100)
      this.flipX = false;
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

      this.setVelocityX(100)
      this.flipX = true;
      if (this.moveTime > 1500) {
        this.NewStateMachine.setState('walk-left');
      }
    }

    handleStomped(enemy) {
      
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
      // console.log(this);
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
        // repeat: -1
      })
    }
}
