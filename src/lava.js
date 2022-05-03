import GameObject from './gameobj.js';


/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class lava extends GameObject {
  
    constructor(scene,x,y){
      super(scene,x,y,'Lava', 10,'lava', 'Lava', 1,6);
        //hay que cambiar los nombres y los numeros de frames TODO
    }
}