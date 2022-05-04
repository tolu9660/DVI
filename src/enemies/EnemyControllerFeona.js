
import { sceneEvents as events } from '../EventsCenter.js';

import EnemiesClass from './EnemiesClass.js';
import NewStateMachine from '../newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */


 export default class EnemyControllerFeona extends EnemiesClass {

  constructor(scene,x,y,type){

   super(scene, x,y,type,[1,15],[1,5],[1,4],[1,10],[1,7],10);
    // this.body.setSize(this.width/2,this.height/2)
        // this.body.setSize(this.width/2,this.height/2)
        this.setSize(this.width/2,this.height/2)
        this.flipX = true;
        this.damage=3;
        this.health=5;
        // this.body.setOffset(this.width,this.height);
        console.log(this.NewStateMachine);
        this.NewStateMachine.addState('waiting', {
          onEnter: this.waitingpOnEnter,
          onUpdate: this.waitingOnUpdate
        })
        this.scene = scene
        this.bulletsEnemy = this.scene.physics.add.group({
          classType: Phaser.Physics.Arcade.Image 
        });
      //   this.triggerTimer = this.scene.time.addEvent({
      //     callback: this.shootEnemy,
      //     callbackScope: this,
      //     //delay: 2000,// + getRandom(0, 1000), // 1000 = 1 second
      //     delay: Math.random() * (2000 - 1000) + 1000,
      //     loop: true
      // });
      
      // this.scene.physics.add.collider(this.bullet,this.scene.enemies,this.handleBulletsEnemiesCollision,undefined,this)
}

walkLeftOnUpdate(dt){
  this.moveTime += dt
  this.setVelocityX(-200)
  this.flipX = false;
  if (this.moveTime > 3000) {
    this.NewStateMachine.setState('walk-right');
  }
  if(Math.abs(this.x - this.scene.playerController.x) < 500) {
    this.NewStateMachine.setState('waiting');
        
  }
  
}
 

    
walkRightOnUpdate(dt){
  this.moveTime += dt

  this.setVelocityX(200)
  this.flipX = true;
  if (this.moveTime > 3000) {
    this.NewStateMachine.setState('walk-left');
  }
  if(Math.abs(this.x - this.scene.playerController.x) < 500) {
    this.NewStateMachine.setState('waiting');
  }
}
deathOnEnter(){
  console.log('enemigo muerto');

  if(Math.abs(this.x - this.scene.playerController.x) < 150 ) {
    this.scene.playerController.setVelocityY(-300)
    this.scene.playerController.NewStateMachine.setState('enemy-hit');
    this.scene.playerController.health -=1

  }
  // this.destroy()
}

waitingpOnEnter(){
  this.play('enemy-idle')
  this.body.setVelocityX(0);
}

waitingOnUpdate(){
  if(Math.abs(this.x - this.scene.playerController.x) < 200 ) {
    console.log('exploto');
    
    
    this.NewStateMachine.setState('explotar');
  //   this.on('animationcomplete', () =>{
      
  }
  // })
}
  // this.setBounceY(1)
  // this.shootEnemy()
  
  // console.log(Math.abs(this.x - this.scene.playerController.x));
  
  // console.log(this.x);
  // console.log(this.scene.playerController.x);
  // if(Math.abs(this.x - this.scene.playerController.x) < 100 ) {
  //   this.body.setVelocityX(0);
  //   this.on('animationcomplete', () =>{
      
  //     console.log('exploto');
  //   })
    
  // }

// update(dt){
//   console.log('pedo');
//   console.log(this.body.y);
//   console.log('pedo');  
// }

 }
