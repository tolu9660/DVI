

import { sceneEvents as events } from '../EventsCenter.js';

import NewStateMachine from '../newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */
export default class EnemiesClass extends Phaser.Physics.Arcade.Sprite  {
  
    constructor(scene,x,y,type,idle,walk,rate){
        super(scene,x,y,type)
        this.type=type;
        this.idle= idle
        this.walk= walk
        this.rate= rate
        console.log(this.idle);
        // this.setDepth(0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this,this.scene.groundLayer)
        this.scene = scene

        // this.idle=idle;
        // this.walk= walk;
        // this.imgIdle=imgIdle;
        // this.imgWalk=imgWalk;
        // this.img=img;
        // this.starFrate= startFrate;
        // this.endFrate= endFrate;
        // this.rate=rate
        this.moveTime = 0;

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
      this.play('enemy-idle',true)
    
      const r = Phaser.Math.Between(1, 100)
      if (r < 50) {
        this.NewStateMachine.setState('walk-left')
      } else {          
        this.NewStateMachine.setState('walk-right')
      }
    }
    idleOnUpdate(){
        this.NewStateMachine.setState('walk')
    }

    walkLeftOnEnter(){
      this.moveTime = 0
      this.play('enemy-walk',true)
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
      // this.anims.create({
      //   key:'enemy-idle',
      //   frames: [{key: this.type, frame: 'Alien_Idle_1.png'}]
      // })
      
      this.anims.create({
        key:'enemy-idle',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.type, {
          start: this.idle[0],
          end: this.idle[1],
          prefix: 'Alien_Idle_',
          suffix: '.png'
        }),
        repeat: -1
      })

      this.anims.create({
        key:'enemy-walk',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.type, {
          start: this.walk[0],
          end: this.walk[1],
          prefix: 'Alien_Walk_',
          suffix: '.png'
        }),
        repeat: -1
      })
      this.anims.create({
        key:'enemy-jump',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.img, {
          start: this.starFrate,
          end: this.endFrate,
          prefix: 'Alien_Jump_',
          suffix: '.png'
        }),
        // repeat: -1
      })
      this.anims.create({
        key:'enemy-attack',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.img, {
          start: this.starFrate,
          end: this.endFrate,
          prefix: 'Alien_Attack_',
          suffix: '.png'
        }),
        // repeat: -1
      })
      this.anims.create({
        key:'enemy-death',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.img, {
          start: this.starFrate,
          end: this.endFrate,
          prefix: 'Alien_Death_',
          suffix: '.png'
        }),
        // repeat: -1
      })
      this.anims.create({
        key:'enemy-hit',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.img, {
          start: this.starFrate,
          end: this.endFrate,
          prefix: 'Alien_hit_',
          suffix: '.png'
        }),
        // repeat: -1
      })
      this.anims.create({
        key:'enemy-shoot',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.img, {
          start: this.starFrate,
          end: this.endFrate,
          prefix: 'Alien_Shoot_',
          suffix: '.png'
        }),
        // repeat: -1
      })
    }
}
