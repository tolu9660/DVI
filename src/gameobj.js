


import NewStateMachine from './newStateMachine.js';

export default class GameObject {
  
    constructor(scene,sprite,nombreKey,fRate,img,preFix,Vstart,vEnd){
 
        this.scene = scene;
        this.sprite = sprite;
        this.nombreKey=nombreKey
        this.fRate=fRate
        this.Vstart=Vstart
        this.vEnd=vEnd
        this.preFix=preFix
        this.img=img
        this.createAnimation();
        this.NewStateMachine = new NewStateMachine(this,this.img);

        this.NewStateMachine.addState('giro', {
          onEnter: this.animar,
         
        })
        .setState('giro')
    
    }
   
  
      animar(){
        this.sprite.play(this.nombreKey)
      }
      
      

    actu(dt){
      this.NewStateMachine.update(dt);
    }
    createAnimation(){   
    
        this.sprite.anims.create({
          key:this.nombreKey,
          frameRate: this.fRate,
          frames:this.sprite.anims.generateFrameNames(this.img, {
            start: this.Vstart,
            end: this.vEnd,
            prefix: this.preFix,
            suffix: '.png'
          }),
          repeat: -1
        })
      }
}
