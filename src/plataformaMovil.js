import Star from './star.js';

import { sceneEvents as events } from './EventsCenter.js';

import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class plataformaMovil {
  
    constructor(scene,sprite){
      // super({ key: 'player-controller' });
        this.scene = scene,
        this.sprite = sprite;

        this.moveTime = 0;
        this.createEnemyAnimation();

        this.NewStateMachine = new NewStateMachine(this, 'pm');

        this.NewStateMachine.addState('idle', {
          onEnter: this.idleOnEnter,
          onUpdate: this.idleOnUpdate
        })
        .addState('move-left', {
          onEnter: this.moveLeftOnEnter,
          onUpdate: this.moveLeftOnUpdate,
          
        })
        .addState('move-right',{
          onEnter: this.moveRightOnEnter,
          onUpdate: this.moveRightOnUpdate,
        })
        .setState('idle')
    
    }
    idleOnEnter(){
      this.sprite.play('pm-idle')
      const r = Phaser.Math.Between(1, 100)
      if (r < 50) {
        this.NewStateMachine.setState('move-left')
      } else {
        this.NewStateMachine.setState('move-right')
      }
    }
    idleOnUpdate(){
     
        // this.NewStateMachine.setState('walk')
    
    }

    moveLeftOnEnter(){
      this.moveTime = 0
      this.sprite.play('pm-idle')
    }

    moveLeftOnUpdate(dt){
      this.moveTime += dt
      this.sprite.setVelocityX(-2)
     
      if (this.moveTime > 2000) {
        this.NewStateMachine.setState('move-right');
      }
      
    }

    moveRightOnEnter(){
      this.moveTime = 0
      this.sprite.play('pm-idle')
    }
    
    moveRightOnUpdate(dt){
      this.moveTime += dt
      this.sprite.setVelocityX(2)
      
      if (this.moveTime > 2000) {
        this.NewStateMachine.setState('move-left');
      }
    }



    actu(dt){
      this.NewStateMachine.update(dt);
    }
    createEnemyAnimation(){   
      this.sprite.anims.create({
        key:'pm-idle',
        frames: [{key: 'pm', frame: 'pm.png'}]
      })
    }
}
