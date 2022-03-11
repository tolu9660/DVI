

import { sceneEvents as events } from './EventsCenter.js';

import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class corazon {

    constructor(scene,sprite){
        // super({ key: 'player-controller' });
          this.scene = scene,
          this.sprite = sprite;
  
          this.moveTime = 0;
          this.createCoraAnimation();
        this.move();
      
      }

    move(){
        this.sprite.play('CoraGiro')  
    }
    update(dt){
        this.move();
    }
    createCoraAnimation(){   
       
        this.sprite.anims.create({
          key:'CoraGiro',
          frameRate: 10,
          frames:this.sprite.anims.generateFrameNames('cora', {
            start: 0,
            end: 3,
            prefix: 'Cora_',
            suffix: '.png'
          }),
          repeat: -1
        })
      }

}