
import { sceneEvents as events } from '../EventsCenter.js';

import EnemiesClass from './EnemiesClass.js';
import NewStateMachine from '../newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */


 export default class EnemyControllerJackal extends EnemiesClass {

  constructor(scene,x,y,type){

    //le paso a la clase padre la key con la que voy a idenificar a mi enemigo
   //scene,x,y,type,idle,walk,jump,attack,death,hit,shoot,10
   super(scene, x,y,type,[1,6],[1,5],[1,6],[1,6],[1,7],[1,4],null,10);
        // this.body.setSize(this.width/2,this.height/2)
        // this.body.setSize(this.width/2,this.height/2)
        this.setSize(this.width/2,this.height/2)
        // this.body.setOffset(this.width,this.height);
        this.damage=1;
        this.health=3;
        console.log(this.NewStateMachine);
        this.scene = scene
        this.bulletsEnemy = this.scene.physics.add.group({
          classType: Phaser.Physics.Arcade.Image 
        });
        this.triggerTimer = null;
      
      // this.scene.physics.add.collider(this.bullet,this.scene.enemies,this.handleBulletsEnemiesCollision,undefined,this)


}
idleOnEnter(){
  this.play('enemy-idle',true)
  this.setBounceY(1)
//   this.triggerTimer = this.scene.time.addEvent({
//     callback: this.shootEnemy,
//     callbackScope: this,
//     //delay: 2000,// + getRandom(0, 1000), // 1000 = 1 second
//     delay: Math.random() * (2000 - 1000) + 1000,
//     loop: true
// });

}

idleOnUpdate(){

  this.setBounceY(1)
  if(Math.abs(this.x - this.scene.playerController.x) < 800) {
    this.NewStateMachine.setState('jump');
  }
}
jumpOnEnter(){
  // this.setVelocityY(-200)
  this.setBounceY(1)
  // this.play('enemy-jump',true)
  this.triggerTimer = this.scene.time.addEvent({
    callback: this.shootEnemy,
    callbackScope: this,
    //delay: 2000,// + getRandom(0, 1000), // 1000 = 1 second
    delay: Math.random() * (2000 - 1000) + 1000,
    loop: true
});
}
jumpOnUpdate(){
  // this.setVelocityY(-50)
  
  // this.shootEnemy()
  if(Math.abs(this.x - this.scene.playerController.x) > 800) {
    this.NewStateMachine.setState('idle');
    this.triggerTimer.remove()
  }
  // console.log(Math.abs(this.x - this.scene.playerController.x));
  // if(Math.abs(this.x - this.scene.playerController.x) < 800 && Math.abs(this.x - this.scene.playerController.x) > 150) {
  //   if(this.x < this.scene.playerController.x) //Jugador a la derecha
  //   {
  //     // this.play('move-skeleton', true);
  //     this.play('enemy-walk',true)
  //     this.body.setVelocityX(200);
  //   }
  //   else//Jugador a la izquierda
  //   {
  //     // this.play('move-skeleton', true);
  //     this.play('enemy-walk',true)
  //       this.body.setVelocityX(-200);
  //   }
  // }
  // console.log(this.x);
  // console.log(this.scene.playerController.x);
  // if(Math.abs(this.x - this.scene.playerController.x) < 100 ) {
  //   this.body.setVelocityX(0);
  //   this.on('animationcomplete', () =>{
      
  //     console.log('exploto');
  //   })
    
  // }
}
// update(dt){
//   console.log('pedo');
//   console.log(this.body.y);
//   console.log('pedo');  
// }
shootEnemy(){
  // console.log(this.body.deltaX());
  // sprite.angle = sprite.body.angle;
  // console.log(this.sprite.body);
  console.log(this.scaleX);
  // console.log(this.sprite.rotation);
  const vector = new Phaser.Math.Vector2(1,0)
  if (this) {
    // if (this.body.deltaX() < 0) {
    //   vector.x = -1
    // }else {
    //   vector.x = 1
    // }
    this.bullet = this.bulletsEnemy.get(this.x, this.y, 'bullet');
    console.log(this.scene);
    this.scene.physics.add.collider(this.bullet,this.scene.playerController,this.handleBulletsEnemiesCollision,undefined,this)
    // this.anims.play('bullet')
    this.bullet.setActive(true)
    this.bullet.setVisible(true)
    this.bullet.body.allowGravity = false
    this.bullet.setRotation(vector.angle())
  
    // this.bullet.x += vector.x = 16 
  
  
  
    this.bullet.setVelocityX(vector.x * 500, 300)
  }

  

}
handleBulletsEnemiesCollision(bullet, player) {
  console.log(bullet);
  console.log(player);      
  bullet.destroy()
  player.damage();

}
 }
