

import { sceneEvents as events } from './EventsCenter.js';

import EnemiesClass from './enemies/EnemiesClass.js';
import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */


 export default class EnemyController2 extends EnemiesClass {

constructor(scene,sprite,tipo){
  //le paso a la clase padre la key con la que voy a idenificar a mi enemigo
  super(scene, sprite,tipo,'enemy-idle','enemy-walk','enemigo3.png',
        'Alien2 Walk',tipo,1,5,10);
}

 }
