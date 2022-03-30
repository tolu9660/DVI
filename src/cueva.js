import GameObject from './gameobj.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class cueva extends GameObject {
  
    constructor(scene,sprite){
      super(scene, sprite,'cuevaGiro', 10,'cueva', 'cueva_', 1,7);
    }
   
}