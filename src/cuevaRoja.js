import GameObject from './gameobj.js';

export default class cuevaRoja extends GameObject {
  
    constructor(scene,x,y,level){
     
   //roja:
    super(scene,x,y,'cuevaGiro', 10,'cuevaR', 'Cave1_', 1,6);
    
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