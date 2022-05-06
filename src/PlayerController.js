

import { sceneEvents as events } from './EventsCenter.js';
import Pause from './Pause.js';

import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class PlayerController extends Phaser.Physics.Arcade.Sprite {
  
 

    constructor(scene,x,y){
      super(scene,x,y,'hero');
        // this.scene = scene,
        // this.sprite = sprite;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.scene.physics.add.sprite(x + (this.width),y, 'hero')
        this.flipFlop;
        this.scene.cameras.main.startFollow(this, false, 0.05, 0.5);
        this.scene.cameras.main.setDeadzone(400, 350);
        
        this.scene.cameras.main.shake(200, 0.05, true, Phaser.Cameras.SHAKE_HORIZONTAL, false);

        this.scene.cameras.main.zoom = 0.3;
       
        // this.scene.cameras.main.startFollow(this, false, 0.05, 0.5);
        // this.scene.cameras.main.fadeIn(1000);

        // .setScale('0.8')  
        this.scene.physics.add.collider(this,this.scene.groundLayer)
        // this.scene.cameras.main.startFollow(this)

        this.scaleX = -1
        this.setOffset(this.width,0);
        this.cursors = this.scene.input.keyboard.addKeys({
          up:Phaser.Input.Keyboard.KeyCodes.UP,
          down:Phaser.Input.Keyboard.KeyCodes.DOWN,
          left:Phaser.Input.Keyboard.KeyCodes.LEFT,
          right:Phaser.Input.Keyboard.KeyCodes.RIGHT,
          space:Phaser.Input.Keyboard.KeyCodes.SPACE,
          E:Phaser.Input.Keyboard.KeyCodes.E,
          D:Phaser.Input.Keyboard.KeyCodes.D,
          ESC:Phaser.Input.Keyboard.KeyCodes.ESC,
          C:Phaser.Input.Keyboard.KeyCodes.C
        });
        this.hasKey = false;
        this.lastEnemy;
        this.damageBala = 1;
        this.damageBalaPower = 2;
        this.energy = 0;
        this.energyPlus = 0;
        this.health = 6;
        this.balas = this.scene.physics.add.group({
          classType: Phaser.Physics.Arcade.Image 
        });
        this.balas_potenciadas = this.scene.physics.add.group({
          classType: Phaser.Physics.Arcade.Image 
        });
        this.scene.physics.add.collider(this.balas,this.scene.groundLayer,this.handleBulletsGroundCollision,undefined,this.scene)
        this.scene.physics.add.collider(this.balas_potenciadas,this.scene.groundLayer,this.handleBulletsGroundCollision,undefined,this.scene)

        this.scene.physics.add.overlap(this,this.scene.enemies,this.handlePlayerEnemiesCollision,undefined,this.scene)

        

        this.scene.physics.add.collider(this,this.scene.objects,this.handleObjectsplayer,undefined,this)

        this.createAlienAnimation();

        this.NewStateMachine = new NewStateMachine(this, 'player');

        this.NewStateMachine.addState('idle', {
          onEnter: this.idleOnEnter,
          onUpdate: this.idleOnUpdate
        })
          .addState('walk', {
            onEnter: this.walkOnEnter,
            onUpdate: this.walkOnUpdate,
            onExit: this.walkOnExit
          })
          .addState('jump', {
            onEnter: this.jumpOnEnter,
            onUpdate: this.jumpOnUpdate
          })
          .addState('spike-hit', {
            onEnter: this.spikeOnEnter,
          })
          .addState('enemy-hit', {
            onEnter: this.enemyHitOnEnter,
            onUpdate: this.enemyHitOnUpdate
          })
          .addState('enemy-down', {
            onEnter: this.enemyDownOnEnter,
          })
          .setState('idle');
          

          


    }
    handlePlayerEnemiesCollision(player,enemigo){    
      if (player.body.deltaY()>enemigo.body.deltaY()) {
        player.setVelocityY(-400)
        if (enemigo.triggerShoot != null){
          enemigo.triggerShoot.remove()
        }
        enemigo.destroy()
      }else if ((player.body.x < enemigo.body.x && enemigo.body.deltaX()<0) || (player.body.x > enemigo.body.x && enemigo.body.deltaX()>0)) {
        if (player.body.x < enemigo.body.x) {
          player.setVelocityX(-400)
        } else {
          player.setVelocityX(400)
        }
        switch(enemigo.type){
          case 'alien':
            this.health -=  1;
            events.emit('heart',this.health)
            break;
          case 'alien1':

            this.health -= 2;
            events.emit('heart', this.health)
            break;
          
      }
        player.NewStateMachine.setState('enemy-hit');
      }
    }
    idleOnEnter(){
      this.play('player-idle',true)
      this.setVelocity(0)
    }
    idleOnUpdate(){
      if (this.cursors.left.isDown || this.cursors.right.isDown ){
        this.NewStateMachine.setState('walk')
      }
      if (this.cursors.up.isDown ){
        this.NewStateMachine.setState('jump')
      }
      
    }
    walkOnEnter(){
      this.play('player-walk', true)
    }
    walkOnUpdate(){
      this.play('player-walk', true)
      const speed = 300
      
      if (this.cursors.left.isDown) {
        this.flipX = true;
        this.setVelocityX(-speed);
        if (this.cursors.up.isDown) {
          this.NewStateMachine.setState('jump');
        }
        if(this.cursors.D.isDown) {
       
            this.setVelocityX(-800)
       
        }
      }
      else if (this.cursors.right.isDown) {
        this.flipX = false;
        this.setVelocityX(speed);
        if (this.cursors.up.isDown) {
          this.NewStateMachine.setState('jump');
        }
        if(this.cursors.D.isDown) {
            this.setVelocityX(800)
          
       
      }
      } 
      else {
        this.NewStateMachine.setState('idle')
      }
      if (this.cursors.up.isDown) {
        this.NewStateMachine.setState('jump');
      }
    }
    walkOnExit() {
      this.stop();
    }

    jumpOnEnter(){
      this.setVelocityY(-600)
    }

    jumpOnUpdate(){
      const speed = 300


      if (this.cursors.left.isDown) {
        this.flipX = true;
        this.setVelocityX(-speed);
        this.play('player-walk',true)
        if (this.body.onFloor()){
          this.NewStateMachine.setState('idle')    
        }
      }
      else if (this.cursors.right.isDown) {
        this.flipX = false;
        this.setVelocityX(speed);
        this.play('player-walk',true)
        if (this.body.onFloor()){
          this.NewStateMachine.setState('idle')    
        }
      }else if (this.body.onFloor()){
        this.NewStateMachine.setState('idle')    
      }   
    
    }

    spikeOnEnter() {
      this.setVelocityY(200)
      const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
      const endColor = Phaser.Display.Color.ValueToColor(0xff0000)

      this.scene.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 100,
        repeat: 2,
        yoyo: true,
        onUpdate: tween => {
          const value = tween.getValue()
          const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
            startColor,
            endColor,
            100,
            value
          )
          const color = Phaser.Display.Color.GetColor(
            colorObject.r,
            colorObject.g,
            colorObject.b
          )
          this.sprite.setTint(color)
        }
      })
      events.emit('heart',this.health)
      this.NewStateMachine.setState('idle')
    }

    enemyHitOnEnter() {


      const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
      const endColor = Phaser.Display.Color.ValueToColor(0x0000ff)

      this.scene.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 100,
        repeat: 2,
        yoyo: true,
        onUpdate: tween => {
          const value = tween.getValue()
          const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
            startColor,
            endColor,
            100,
            value
          )
          const color = Phaser.Display.Color.GetColor(
            colorObject.r,
            colorObject.g,
            colorObject.b
          )
          this.setTint(color)
        },
        onComplete: () => {
          this.NewStateMachine.setState('idle')
        }
      })
    }
    enemyHitOnUpdate() {
      
    }

    enemyDownOnEnter() { 

      this.sprite.setVelocityY(-3)
      this.sprite.setVelocityX(-3)

  

      this.NewStateMachine.setState('idle')
    }
    setBalas(balas){
      this.balas = balas
    }
    setBalasPotenciadas(balas){
      this.balas_potenciadas = balas
    }

    handleObjectsplayer(player,objeto){
      switch (objeto.img) {
        
        case 'energia':
          this.energy += 3
          events.emit('energy', this.energy)
          objeto.destroy();
          events.emit('mensaje-ayuda-energia', this.scene.scene.key)
        break;
        case 'energiaRosa':
          this.energyPlus += 5
          events.emit('energyPlus', this.energyPlus)
          objeto.destroy();
          events.emit('mensaje-ayuda-energia', this.scene.scene.key)
        break;
        case 'corazon':
          if (this.health < 6){
            this.health += 1
          }          
          events.emit('heart',this.health)
          objeto.destroy();
          events.emit('mensaje-ayuda-corazon', this.scene.scene.key)
        break;
        case 'llave':
          events.emit('key-collected')
          objeto.destroy();
          events.emit('mensaje-ayuda-llave', this.scene.scene.key)
          this.hasKey = true;
        break;
        case 'cofre':
          if(objeto.random()==1){
            this.energy+=5;
            events.emit('energy', this.energy)
            objeto.destroy();
          }
          else{
            if (this.health < 6){
              this.health += 1
            }     
            events.emit('heart',this.health)
            objeto.destroy();
          }
          
        break;
        case 'pm':
        if (objeto.getType()=='pmt'){
          if (player.body.deltaY()>objeto.body.deltaY()) {
            objeto.body.ignoreGravity = false;
            objeto.body.immovable=false;
            this.scene.time.addEvent({
              callback: () =>{
                objeto.destroy();
              },
              callbackScope: this,
              delay: 1500,
              loop: false
            });
          }
            
        }
        break;
        
        case 'cuevaA':
          if(this.hasKey){
            events.emit('cueva-in',objeto.getLevel(),objeto.nextLevel())
            objeto.destroy();
           
         
          }
          
        break;
        case 'cuevaR':
          if(this.hasKey){
            events.emit('cueva-in',objeto.getLevel(),objeto.nextLevel())
            objeto.destroy();
           
          }
          break;
        case 'cuevaM':
          if(this.hasKey){
          events.emit('cueva-in',objeto.getLevel(),objeto.nextLevel())
          objeto.destroy();
         
          }
        break;
        case 'acido':
          this.health -=  1;
          events.emit('heart',this.health)
          player.body.setVelocityY(-200);
          player.NewStateMachine.setState('enemy-hit');
        break;
        case 'pinchos':
          this.health -= 2;
          events.emit('heart', this.health)
          player.body.setVelocityY(-300);
          player.NewStateMachine.setState('enemy-hit');
        break;
        case 'lava':
          this.health -= 1;
          events.emit('heart', this.health)
          player.body.setVelocityY(-100);
          player.NewStateMachine.setState('enemy-hit');
        break;
        case 'arbusto':
          this.health -= 1;
          events.emit('heart', this.health)
          player.body.setVelocityY(-400);
          player.NewStateMachine.setState('enemy-hit');
        break;
        default:
          break;
      }
    }

    shoot(){
      const vector = new Phaser.Math.Vector2(0,0)
      //con esto permitimos que el disparo salga en el sentido en el que mira el jugador 
      if (this.flipX ) {
        vector.x = -1
      }else {
        vector.x = 1
      }
      this.bala = this.balas.get(this.x, this.y, 'bala');
      this.scene.physics.add.overlap(this.bala,this.scene.enemies,this.handleBalasEnemiesCollision,undefined,this)
      this.bala.setActive(true)
      this.bala.setVisible(true)
      this.bala.body.allowGravity = false
      this.bala.setRotation(vector.angle())
   
      this.bala.setVelocityX(vector.x * 500, 300)
      

    }
    shootPower(){
      const vector = new Phaser.Math.Vector2(0,0)

      if (this.flipX ) {
        vector.x = -1
      }else {
        vector.x = 1
      }
      this.bala_potenciada = this.balas_potenciadas.get(this.x, this.y, 'bala_potenciada');
      this.scene.physics.add.overlap(this.bala_potenciada,this.scene.enemies,this.handleBalasEnemiesCollision,undefined,this)
      this.bala_potenciada.setActive(true)
      this.bala_potenciada.setVisible(true)
      this.bala_potenciada.body.allowGravity = false
      this.bala_potenciada.setRotation(vector.angle())


      this.bala_potenciada.setVelocityX(vector.x * 500, 300)
      

    }
    handleBulletsGroundCollision(bala, ground) {
      bala.destroy() 
    }
    handleBalasEnemiesCollision(bala, enemy) {
    
      bala.destroy()
      if (enemy.health<=0){
        if (enemy.triggerShoot != null) {
          enemy.triggerShoot.remove()
        }
      }
      enemy.health -= this.damageBala
    }

    update(dt){

      this.NewStateMachine.update(dt);
      if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
        this.shoot();
      }     
 
      if (Phaser.Input.Keyboard.JustDown(this.cursors.C)) {
        if (this.energyPlus > 0) {
          this.shootPower();
        this.energyPlus -= 1
        }
        
      }   
      if (Phaser.Input.Keyboard.JustDown(this.cursors.ESC)) {

          this.scene.scene.launch('pause')
         
      } 
      if (!this.body.onFloor() && this.energy >0 && Phaser.Input.Keyboard.JustDown(this.cursors.E)) {
        this.setVelocityY(-600)
        this.energy = this.energy - 1
        events.emit('energy', this.energy)
      }
      events.emit('heart',this.health)
      events.emit('energyPlus',this.energyPlus)
      if (this.health <= 0) {
        this.scene.scene.start('gameover')
      }
    }

    createAlienAnimation(){
      this.anims.create({
        key:'player-idle',
        frameRate: 10,
        frames:this.anims.generateFrameNames('hero', {
          start: 1,
          end: 13,
          prefix: 'Hero Boy Idle',
          suffix: '.png'
        }),
        repeat: -1
      })
  
      this.anims.create({
        key:'player-walk',
        frameRate: 11,
        frames:this.anims.generateFrameNames('hero', {
          start: 0,
          end: 5,
          prefix: 'Hero-Boy-Run-',
          suffix: '.png'
        }),
        repeat: -1
      })

    }
  
    damage(){
      this.health -= 1;
    }


 }
