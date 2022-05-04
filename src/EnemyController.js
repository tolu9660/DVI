
import { sceneEvents as events } from './EventsCenter.js';

import EnemiesClass from './EnemiesClass.js';
import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */


 export default class EnemyController extends EnemiesClass {

  constructor(scene,x,y,type){

    //le paso a la clase padre la key con la que voy a idenificar a mi enemigo
    super(scene, x,y,'alien5','enemy-idle','enemy-walk','Alien5 Walk3.png',
          'Alien5 Walk','alien5',1,5,10);
        // this.body.setSize(this.width/2,this.height/2)
        // this.body.setSize(this.width/2,this.height/2)
        this.setSize(this.width/2,this.height/2)
        // this.body.setOffset(this.width,this.height);
}

// update(dt){
//   console.log('pedo');
//   console.log(this.body.y);
//   console.log('pedo');  
// }

 }
