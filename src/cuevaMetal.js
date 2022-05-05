import GameObject from './gameobj.js';

export default class cuevaMetal extends GameObject {
  
    constructor(scene,x,y,level){
   //azul:
   super(scene, x,y,'cuevaGiro', 10,'cuevaM', 'Cyberdoor Open', 1,11);
    //this.body.ignoreGravity = true;
    //this.body.immovable=true;
      this.level=level;
      this
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