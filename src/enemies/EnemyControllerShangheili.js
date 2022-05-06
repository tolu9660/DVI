
import EnemiesClass from './EnemiesClass.js';

/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */
export default class EnemyControllerShangheili extends EnemiesClass {

  constructor(scene, x, y, type) {

    //le paso a la clase padre la key con la que voy a idenificar a mi enemigo
    //scene,x,y,type,idle,walk,jump,attack,death,hit,shoot,10
    super(scene, x, y, type, [1, 4], [1, 5], null, [1, 10], [1, 10], [1, 4], null, 10);
    this.setSize(this.width / 2, this.height / 2)
    this.damage = 2;
    this.health = 5;
    this.scene = scene



  }
  walkLeftOnUpdate(dt) {
    this.moveTime += dt
    this.setVelocityX(-100)
    this.flipX = false;
    if (this.moveTime > 3000) {
      this.NewStateMachine.setState('walk-right');
    }
    if (Math.abs(this.x - this.scene.playerController.x) < 800 && Math.abs(this.x - this.scene.playerController.x) > 150) {
      this.NewStateMachine.setState('seguir');

    }

  }


  walkRightOnUpdate(dt) {
    this.moveTime += dt

    this.setVelocityX(100)
    this.flipX = true;
    if (this.moveTime > 3000) {
      this.NewStateMachine.setState('walk-left');
    }
    if (Math.abs(this.x - this.scene.playerController.x) < 800 && Math.abs(this.x - this.scene.playerController.x) > 150) {
      this.NewStateMachine.setState('seguir');
    }
  }
}
