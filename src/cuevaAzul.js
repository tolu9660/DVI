import GameObject from './gameobj.js';

export default class cuevaAzul extends GameObject {
  
    constructor(scene,x,y,level){
   //azul:
   super(scene, x,y,'cuevaGiro', 10,'cuevaA', 'Cave2_', 1,7);
   
      this.level=level;
  }
  getLevel(){
    return this.level;

  }
  nextLevel(){
    let nLevel;
    switch(this.level){
      case 'tutorial':
      nLevel='transicionTutorial0';
      break;
      case 'level1':
        nLevel='transicionnivel1';
      break;
      case 'level2':
        nLevel='transicionnivel2_0';
      break;
      case 'level3':
        nLevel='transicionnivel3';
      break;
      case 'levelfinal':
        nLevel='transicionnivel4_1';
      break;
    
      }
return nLevel;
  }
}