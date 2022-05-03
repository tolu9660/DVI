import GameObject from './gameobj.js';


/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class acido extends GameObject {
  
    constructor(scene,x,y){
      super(scene,x,y,'Acido', 10,'acido', 'Acido', 1,6);
      this.body.immovable = true;
      //this.body.allowGravity = false;
    }
}