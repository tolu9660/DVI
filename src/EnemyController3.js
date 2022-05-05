

import { sceneEvents as events } from './EventsCenter.js';

import EnemiesClass from './enemies/EnemiesClass.js';
import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */


 export default class EnemyController3 extends EnemiesClass {

constructor(scene,sprite,tipo){
  //le paso a la clase padre la key con la que voy a idenificar a mi enemigo
  super(scene, sprite,tipo,'enemy-idle','enemy-walk','enemigo4.png',
        'Alien_Walk_',tipo,1,5,10);
}

 }
