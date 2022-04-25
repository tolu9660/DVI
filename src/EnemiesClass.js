

import { sceneEvents as events } from './EventsCenter.js';

import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */
export default class EnemiesClass {
  
    constructor(scene,sprite,Type,idle,walk,imgIdle,imgWalk,img,startFrate,endFrate,rate){

        this.scene = scene,
        this.sprite = sprite;
        this.idle=idle;
        this.walk= walk;
        this.imgIdle=imgIdle;
        this.imgWalk=imgWalk;
        this.img=img;
        this.starFrate= startFrate;
        this.endFrate= endFrate;
        this.rate=rate
        this.moveTime = 0;
        this.createEnemyAnimation();

        this.NewStateMachine = new NewStateMachine(this, Type);

        this.NewStateMachine.addState('idle', {
          onEnter: this.idleOnEnter,
          onUpdate: this.idleOnUpdate
        })
        .addState('walk-left', {
          onEnter: this.walkLeftOnEnter,
          onUpdate: this.walkLeftOnUpdate,
          onExit: this.walkOnExit
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
      this.sprite.play('enemy-idle')
      const r = Phaser.Math.Between(1, 100)
      if (r < 50) {
        this.NewStateMachine.setState('walk-left')
      } else {
        this.NewStateMachine.setState('walk-right')
      }
    }
    idleOnUpdate(){
        // this.NewStateMachine.setState('walk')
    }

    walkLeftOnEnter(){
      this.moveTime = 0
      this.sprite.play('enemy-walk')
    }

    walkLeftOnUpdate(dt){
      this.moveTime += dt
      this.sprite.setVelocityX(-2)
      this.sprite.flipX = true;
      if (this.moveTime > 1500) {
        this.NewStateMachine.setState('walk-right');
      }
      
    }

    walkRightOnEnter(){
      this.moveTime = 0
      this.sprite.play('enemy-walk')
    }
    
    walkRightOnUpdate(dt){
      this.moveTime += dt
      this.sprite.setVelocityX(2)
      this.sprite.flipX = false;
      if (this.moveTime > 1500) {
        this.NewStateMachine.setState('walk-left');
      }
    }

    handleStomped(enemy) {

      if (this.sprite !== enemy) {
        console.log('pepe'); 
      }

      this.sprite.destroy()
      this.NewStateMachine.setState('death')
    }

    update(dt){
      this.NewStateMachine.update(dt);
    }
    createEnemyAnimation(){   
      this.sprite.anims.create({
        key:this.idle,
        frames: [{key: this.img, frame: this.imgIdle}]
      })

      this.sprite.anims.create({
        key:this.walk,
        frameRate: this.rate,
        frames:this.sprite.anims.generateFrameNames(this.img, {
          start: this.starFrate,
          end: this.endFrate,
          prefix: this.imgWalk,
          suffix: '.png'
        }),
        repeat: -1
      })
    }
}
