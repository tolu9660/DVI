


import GameObject from './gameobj.js';
import NewStateMachine from './newStateMachine.js';

/**
 * Clase que representa el objeto de Energía del juego. con ella se va a permitir ir desbloqueando distintas opciones.
 */
export default class energia extends GameObject {
  
    constructor(scene,sprite){
         super(scene, sprite,'eneGiro', 10,'energia', 'Blue Crystal', 1,8);
    }
   
  
}
