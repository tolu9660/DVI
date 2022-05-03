import GameObject from './gameobj.js';


/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class pinchos extends GameObject {
  
    constructor(scene,x,y){
      super(scene,x,y,'CoraGiro', 10,'pinchos', 'Heart', 1,3);
        //hay que cambiar los nombres y los numeros de frames TODO
    }
}