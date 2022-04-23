import GameObject from './gameobj.js';

export default class cueva extends GameObject {
  
    constructor(scene,sprite){
      super(scene, sprite,'cuevaGiro', 10,'cueva', 'cueva_', 1,7);
    }
   
}