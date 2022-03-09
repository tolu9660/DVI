import Star from './star.js';

import { sceneEvents as events } from './EventsCenter.js';

import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class EnemyController {
  
    constructor(scene,sprite){
      // super({ key: 'player-controller' });
        this.scene = scene,
        this.sprite = sprite;
        this.moveTime = 0
        
    //     this.createEnemyAnimation();

    //     this.NewStateMachine = new NewStateMachine(this, 'enemy');
        
    
}
}
