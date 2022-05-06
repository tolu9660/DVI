import EnemiesClass from './EnemiesClass.js';
//PROBLEMAS CON ESTE ENEMY
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */
 export default class EnemyControllerFeona extends EnemiesClass {

  constructor(scene,x,y,type){
    // /scene,x,y,type,idle,walk,jump,attack,death,hit,shoot,10
   super(scene, x,y,type,[1,7],[1,5],null,[1,15],[1,10],[1,4],null,10);
    // this.body.setSize(this.width/2,this.height/2)
        // this.body.setSize(this.width/2,this.height/2)
        this.setSize(this.width/2,this.height/2)
        this.flipX = true;
        this.damage=3;
        this.health=5;

        this.scene = scene

}

walkLeftOnUpdate(dt){
  this.moveTime += dt
  this.setVelocityX(-200)
  this.flipX = false;
  if (this.moveTime > 3000) {
    this.NewStateMachine.setState('walk-right');
  }
  if(Math.abs(this.x - this.scene.playerController.x) < 800 && Math.abs(this.x - this.scene.playerController.x) > 150) {
    this.NewStateMachine.setState('seguir');
        
  }
  
}

    
walkRightOnUpdate(dt){
  this.moveTime += dt

  this.setVelocityX(200)
  this.flipX = true;
  if (this.moveTime > 3000) {
    this.NewStateMachine.setState('walk-left');
  }
  if(Math.abs(this.x - this.scene.playerController.x) < 800 && Math.abs(this.x - this.scene.playerController.x) > 150) {
    this.NewStateMachine.setState('seguir');
  }
}
deathOnEnter(){
  console.log('enemigo muerto');

  if(Math.abs(this.x - this.scene.playerController.x) < 200 ) {
    this.scene.playerController.setVelocityY(-300)
    this.scene.playerController.NewStateMachine.setState('enemy-hit');
    this.scene.playerController.health -=1

  }
  // this.destroy()
}
seguirOnUpdate(){
  console.log('siguiendo');

    if(this.x < this.scene.playerController.x)
    {
      this.play('enemy-walk',true)
      this.body.setVelocityX(200);
    }
    else
    {
      this.play('enemy-walk',true)
        this.body.setVelocityX(-200);
    }

    if(Math.abs(this.x - this.scene.playerController.x) > 800) {
      this.NewStateMachine.setState('idle');
    }

    if(Math.abs(this.x - this.scene.playerController.x) < 200 ) {  
      this.body.setVelocityX(0);
      this.NewStateMachine.setState('explotar');
    //   this.on('animationcomplete', () =>{
        

    // })
  }
}

 }
