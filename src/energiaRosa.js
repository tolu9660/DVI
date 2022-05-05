
import GameObject from './gameobj.js';
import NewStateMachine from './newStateMachine.js';

/**
 * Clase que representa el objeto de Energía del juego. con ella se va a permitir ir desbloqueando distintas opciones.
 */
export default class energiaRosa extends GameObject {
  
    constructor(scene,x,y){
        super(scene,x,y,'eneGiroRosa', 10,'energiaRosa', 'Red Crystal', 1,8);
    }
   
  
}
