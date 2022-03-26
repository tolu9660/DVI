

import { sceneEvents as events } from './EventsCenter.js';

import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class PlatafomraMovil {
  
    constructor(scene,sprite){
      // super({ key: 'player-controller' });
        this.scene = scene,
        this.sprite = sprite;

        this.moveTime = 0;
       //
        this.NewStateMachine = new NewStateMachine(this, 'plataformaMovil');

        this.NewStateMachine.addState('idle', {
          onEnter: this.idleOnEnter,
          //onUpdate: this.idleOnUpdate
        })
        .addState('move-left', {
          onEnter: this.moveLeftOnUpdate,
          //onUpdate: this.walkLeftOnUpdate,
         // onExit: this.walkOnExit
        })
        .addState('move-right',{
          onEnter: this.moveRightOnUpdate,
          //onUpdate: this.walkRightOnUpdate,
        })
        .setState('idle')
    
    }
    idleOnEnter(){
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

    moveLeftOnUpdate(dt){
      this.moveTime += dt
      this.sprite.setVelocityX(-2)
      this.sprite.flipX = true;
      if (this.moveTime > 1500) {
        this.NewStateMachine.setState('move-right');
      }
      
    }

    
    moveRightOnUpdate(dt){
      this.moveTime += dt
      this.sprite.setVelocityX(2)
      this.sprite.flipX = false;
      if (this.moveTime > 1500) {
        this.NewStateMachine.setState('move-left');
      }
    }



    actu(dt){
        // realizamos el movimiento hacia un lado y otro teniendo encuenta el atributo 
      this.NewStateMachine.update(dt);
    }
    
}
