


import GameObject from './gameobj.js';
import NewStateMachine from './newStateMachine.js';


/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class corazon extends GameObject {
  
    constructor(scene,sprite){
      super(scene, sprite,'CoraGiro', 10,'corazon', 'Heart', 1,3);
  
    }
}
