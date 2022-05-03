
import { sceneEvents as events } from './EventsCenter.js';

import EnemiesClass from './EnemiesClass.js';
import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */


 export default class EnemyController extends EnemiesClass {

  constructor(scene,x,y,type){

    //le paso a la clase padre la key con la que voy a idenificar a mi enemigo
    super(scene, x,y,'alien5Walk','enemy-idle','enemy-walk','Alien5 Walk3.png',
          'Alien5 Walk','alien5Walk',0,4,10);
}

 }
