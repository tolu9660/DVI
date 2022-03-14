


import GameObject from './gameobj.js';
import NewStateMachine from './newStateMachine.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class energia extends GameObject {
  
    constructor(scene,sprite){
      // super({ key: 'player-controller' });
        //this.scene = scene,
      // this.sprite = sprite;
      super(scene, sprite,'eneGiro', 10,'ene', 'Blue Crystal', 1,8);
      //this.createCoraAnimation();
/*

        this.NewStateMachine = new NewStateMachine(this, 'cora');

        this.NewStateMachine.addState('giro', {
          onEnter: this.animar,
         
        })
        .setState('giro')
    */
    }
   
  
    /*  animar(){
        this.sprite.play('CoraGiro')
      }

      

    actu(dt){
      this.NewStateMachine.update(dt);
    }
        
      createCoraAnimation(){   
    
        this.sprite.anims.create({
          key:'CoraGiro',
          frameRate: 10,
          frames:this.sprite.anims.generateFrameNames('cora', {
            start: 0,
            end: 3,
            prefix: 'Cora_',
            suffix: '.png'
          }),
          repeat: -1
        })
      }
       */
}
