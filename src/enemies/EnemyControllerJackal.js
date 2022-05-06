import EnemiesClass from './EnemiesClass.js';

/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */
export default class EnemyControllerJackal extends EnemiesClass {

  constructor(scene, x, y, type) {

    //le paso a la clase padre la key con la que voy a idenificar a mi enemigo
    //scene,x,y,type,idle,walk,jump,attack,death,hit,shoot,10
    super(scene, x, y, type, [1, 6], [1, 5], [1, 6], [1, 6], [1, 7], [1, 4], null, 10);
    this.setSize(this.width / 2, this.height / 2)
    this.damage = 1;
    this.health = 3;
    console.log(this.NewStateMachine);
    this.scene = scene
    this.bulletsEnemy = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image
    });
    this.triggerShoot = null;

  }
  idleOnEnter() {
    this.play('enemy-idle', true)
    this.setBounceY(1)
  }

  idleOnUpdate() {

    this.setBounceY(1)
    if (Math.abs(this.x - this.scene.playerController.x) < 800) {
      this.NewStateMachine.setState('jump');
    }
  }
  jumpOnEnter() {
    this.setBounceY(1)
    this.triggerShoot = this.scene.time.addEvent({
      callback: this.shootEnemy,
      callbackScope: this,
      delay: 2000,
      loop: true
    });
  }
  jumpOnUpdate() {
    if (Math.abs(this.x - this.scene.playerController.x) > 800) {
      this.NewStateMachine.setState('idle');
      this.triggerShoot.remove()
    }

  }
  shootEnemy() {
    const vector = new Phaser.Math.Vector2(1, 0)
    if (this) {

      if (this.x > this.scene.playerController.x) {
        vector.x = -1

        this.flipX = false;

      } else {
        vector.x = 1
        this.flipX = true;
      }

      this.bullet = this.bulletsEnemy.get(this.x, this.y, 'jackal_bala');
      this.scene.physics.add.overlap(this.bullet, this.scene.playerController, this.handleBulletsEnemiesCollision, undefined, this)
      this.scene.physics.add.collider(this.bullet, this.scene.groundLayer, this.handleBulletsGroundCollision, undefined, this)
      this.bullet.setActive(true)
      this.bullet.setVisible(true)
      this.bullet.body.allowGravity = false
      this.bullet.setRotation(vector.angle())
      this.bullet.setVelocityX(vector.x * 500, 300)
    }



  }
  handleBulletsEnemiesCollision(bullet, player) {
    bullet.destroy()
    player.damage();

  }
  handleBulletsGroundCollision(bullet, ground) {
    bullet.destroy()
  }

}
