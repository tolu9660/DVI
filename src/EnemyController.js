
import { sceneEvents as events } from './EventsCenter.js';

import EnemiesClass from './EnemiesClass.js';
import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */


 export default class EnemyController extends EnemiesClass {

  constructor(scene,sprite,tipo){
    //le paso a la clase padre la key con la que voy a idenificar a mi enemigo
    super(scene, sprite,tipo,'enemy-idle','enemy-walk','predatormask_idle_1.png',
          'predatormask__0006_walk_','alien',1,6,10);
}

 }
