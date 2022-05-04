


import GameObject from './gameobj.js';
import NewStateMachine from './newStateMachine.js';


/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class cofre extends GameObject {
  
    constructor(scene,x,y){
      super(scene,x,y,'cofreAnimacion', 10,'cofre', 'cofre', 1,3);
  
    }
    random(){
        console.log('vamos a dar recompensas')
        let num =Phaser.Math.Between(1, 2)
        if(num==2){
          console.log("regalo corazones");
          return 2;
        }
        else{
          console.log("regalo gemas");
          return 1;
        }
    

    }

}
