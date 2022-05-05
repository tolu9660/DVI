


import NewStateMachine from './newStateMachine.js';

export default class GameObject extends Phaser.Physics.Arcade.Sprite {
  
    constructor(scene,x,y,nombreKey,fRate,img,preFix,Vstart,vEnd){
        super(scene,x,y,img)
        this.scene = scene;
        // this.sprite = sprite;
        this.nombreKey=nombreKey
        this.fRate=fRate
        this.Vstart=Vstart
        this.vEnd=vEnd
        this.preFix=preFix
        this.img=img
        this.createAnimation();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false
        this.scene.physics.add.collider(this,this.scene.groundLayer)

        this.NewStateMachine = new NewStateMachine(this,this.img);

        this.NewStateMachine.addState('giro', {
          onEnter: this.animar,
         
        })
        .setState('giro')
    
    }
   
  
      animar(){
        this.play(this.nombreKey)
      }
      
      

    actu(dt){
      this.NewStateMachine.update(dt);
    }
    createAnimation(){   
    
        this.anims.create({
          key:this.nombreKey,
          frameRate: this.fRate,
          frames:this.anims.generateFrameNames(this.img, {
            start: this.Vstart,
            end: this.vEnd,
            prefix: this.preFix,
            suffix: '.png'
          }),
          repeat: -1
        })
      }
}
