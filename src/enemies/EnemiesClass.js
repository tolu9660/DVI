

import { sceneEvents as events } from '../EventsCenter.js';

import NewStateMachine from '../newStateMachine.js';
/**
 * Clase que representa el Enemigo del juego,Tiene un movimiento semi-automático
 */
export default class EnemiesClass extends Phaser.Physics.Arcade.Sprite  {
  
    constructor(scene,x,y,type,idle,walk,jump,attack,death,hit,shoot,rate){
        super(scene,x,y,type)
        this.type=type;
        this.idle= idle
        this.walk= walk
        this.jump= jump
        this.attack= attack
        this.death= death
        this.hit= hit
        this.shoot= shoot
        this.rate= rate
        this.health;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this,this.scene.groundLayer)
        this.scene = scene
       
        this.moveTime = 0;

        this.createEnemyAnimation();

        this.NewStateMachine = new NewStateMachine(this, type);

        this.NewStateMachine.addState('idle', {
          onEnter: this.idleOnEnter,
          onUpdate: this.idleOnUpdate
        })
        .addState('walk-left', {
          onEnter: this.walkLeftOnEnter,
          onUpdate: this.walkLeftOnUpdate,
        })
        .addState('walk-right',{
          onEnter: this.walkRightOnEnter,
          onUpdate: this.walkRightOnUpdate,
        })
        .addState('death',{
          onEnter: this.deathOnEnter,
          onUpdate: this.deathOnUpdate,
        }).addState('explotar',{
          onEnter: this.explotarOnEnter,
          onUpdate: this.explotarOnUpdate,
        }).addState('seguir',{
          onEnter: this.seguirOnEnter,
          onUpdate: this.seguirOnUpdate,
        }).addState('jump', {
          onEnter: this.jumpOnEnter,
          onUpdate: this.jumpOnUpdate
        }).addState('attack', {
          onEnter: this.attackOnEnter,
          onUpdate: this.attackOnUpdate
        }).addState('waiting', {
          onEnter: this.waitingOnEnter,
          onUpdate: this.waitingOnUpdate
        }).setState('idle')
        
        

        events.on('alien-down', this.handleStomped, this)

    }
    attackOnEnter(){
      // this.setVelocityY(-50)
    
    }
    attackOnUpdate(){
    }
    waitingOnEnter(){
      // this.setVelocityY(-50)
    }
    waitingOnUpdate(){
    }
    jumpOnEnter(){
      // this.setVelocityY(-50)
    
    }
    jumpOnUpdate(){
      // this.setBounceY(1)
    }
    seguirOnEnter(){

      // this.destroy()
    }
    seguirOnUpdate(){

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


    }
    // }

    deathOnEnter(){
      this.play('enemy-death',true);
    }
    deathOnUpdate(){
      this.on('animationcomplete', () =>{
        this.destroy()
        
    })
      
    }

    explotarOnEnter(){
      this.play('enemy-attack',true);
    }


    explotarOnUpdate(){
          this.on('animationcomplete', () =>{
            this.play('enemy-death',true);
            this.NewStateMachine.setState('death');
            
        })
    }


    idleOnEnter(){
      this.play('enemy-idle',true)
    
      const r = Phaser.Math.Between(1, 100)
      if (r < 50) {
        this.NewStateMachine.setState('walk-left')
      } else {          
        this.NewStateMachine.setState('walk-right')
      }
    }

    walkLeftOnEnter(){
      this.moveTime = 0
      this.play('enemy-walk',true)
    }

    walkLeftOnUpdate(dt){
      this.moveTime += dt
      this.setVelocityX(-100)
      this.flipX = false;
      if (this.moveTime > 3000) {
        this.NewStateMachine.setState('walk-right');
      }
      
    }

    walkRightOnEnter(){
      this.moveTime = 0
      this.play('enemy-walk')
    }
    
    walkRightOnUpdate(dt){
      this.moveTime += dt

      this.setVelocityX(100)
      this.flipX = true;
      if (this.moveTime > 3000) {
        this.NewStateMachine.setState('walk-left');
      }
    }

    handleStomped(enemy) {
      
      console.log('Este es el valor que guarda el atributo:');
      
      if (this!== enemy) {
      }
      switch(this.type){
        case 'alien':
          this.destroy();
          break;
        case 'alien1':
          this.destroy();
          break;
        case 'alien2':
          this.destroy();
          break;
        case 'alien3':
          this.destroy();
            break;
      }
      //this.sprite.destroy()
      this.NewStateMachine.setState('death')
    }

    update(dt){
      this.NewStateMachine.update(dt);
      if (this.health <= 0) {
        // this.destroy()
        this.NewStateMachine.setState('death')
      }
    }
    createEnemyAnimation(){   
      if (this.idle != null) {
        this.anims.create({
          key:'enemy-idle',
          frameRate: this.rate,
          frames:this.anims.generateFrameNames(this.type, {
            start: this.idle[0],
            end: this.idle[1],
            prefix: 'Alien_Idle_',
            suffix: '.png'
          }),
          repeat: -1
        })
      }
      
      if (this.walk) {
        this.anims.create({
          key:'enemy-walk',
          frameRate: this.rate,
          frames:this.anims.generateFrameNames(this.type, {
            start: this.walk[0],
            end: this.walk[1],
            prefix: 'Alien_Walk_',
            suffix: '.png'
          }),
          repeat: -1
        })
      }
      
      if (this.jump) {
        this.anims.create({
          key:'enemy-jump',
          frameRate: this.rate,
          frames:this.anims.generateFrameNames(this.type, {
            start: this.jump[0],
            end: this.jump[1],
            prefix: 'Alien_Jump_',
            suffix: '.png'
          }),
          // repeat: -1
        })
      }
      if (this.attack) {
      this.anims.create({
        key:'enemy-attack',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.type, {
          start: this.attack[0],
          end: this.attack[1],
          prefix: 'Alien_Attack_',
          suffix: '.png'
        }),
        // repeat: -1
      })
    }
      if (this.death) {
      this.anims.create({
        key:'enemy-death',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.type, {
          start: this.death[0],
          end: this.death[1],
          prefix: 'Alien_Death_',
          suffix: '.png'
        }),
        // repeat: -1
      })
    }
      if (this.hit) {
      this.anims.create({
        key:'enemy-hit',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.type, {
          start: this.hit[0],
          end: this.hit[1],
          prefix: 'Alien_Hit_',
          suffix: '.png'
        }),
        // repeat: -1
      })
    }
    if (this.shoot) {
      this.anims.create({
        key:'enemy-shoot',
        frameRate: this.rate,
        frames:this.anims.generateFrameNames(this.type, {
          start: this.shoot[0],
          end: this.shoot[1],
          prefix: 'Alien_Shoot_',
          suffix: '.png'
        }),
        // repeat: -1
      })
    }
  }
}
