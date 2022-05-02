

import { sceneEvents as events } from './EventsCenter.js';

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
        
        this.scene.cameras.main.setBounds(0, 0, 16000, 3000); //Y = 250
        this.scene.cameras.main.zoom = 1;
        this.scene.cameras.main.startFollow(this, false, 0.05, 0.5);
        this.scene.cameras.main.fadeIn(1000);

        // .setScale('0.8')  
        this.scene.physics.add.collider(this,this.scene.groundLayer)
        // this.scene.cameras.main.startFollow(this)
        console.log(this.height);
        // console.log(this);
        // console.log(this.displayWidth());

        this.scaleX = -1
        //Establecemos tamaño y hitbox
        // this.setSize(this.width,this.height);
        // this.body.setSize(this.width,this.height);
        // this.body.setOffset(128,128);
        // this.body.setSize(this.width,this.height);
        this.body.setSize(this.width,this.height);
        this.body.setOffset(this.width,-5);
        this.body.updateFromGameObject();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        // this.cursors = this.scene.input.keyboard.addKeys({
        //   up:Phaser.Input.Keyboard.KeyCodes.W,
        //   down:Phaser.Input.Keyboard.KeyCodes.S,
        //   left:Phaser.Input.Keyboard.KeyCodes.A,
        //   right:Phaser.Input.Keyboard.KeyCodes.D,
        //   space:Phaser.Input.Keyboard.KeyCodes.SPACE,
        //   E:Phaser.Input.Keyboard.KeyCodes.E,
        //   ESC:Phaser.Input.Keyboard.KeyCodes.ESC
        // });

        // this.obstacles = this.scene;
        this.key = false;
        this.lastEnemy;
        this.damage;
        this.bullets = this.scene.physics.add.group({
          classType: Phaser.Physics.Arcade.Image 
        });
        this.scene.physics.add.collider(this.bullets,this.scene.groundLayer,this.handleBulletsGroundCollision,undefined,this.scene)
        this.createAlienAnimation();
        this.scene.physics.add.overlap(thisthis.scene.groundLayer,this.handleBulletsGroundCollision,undefined,this.scene)


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
          })
          .addState('enemy-down', {
            onEnter: this.enemyDownOnEnter,
          })
          .setState('idle');
          

          // this.sprite.setOnCollide((data) => {
          //   const body = data.bodyB;
          //   const gameObject = body.gameObject
          //   if (this.obstacles.is('spikes', body)) {
          //     this.NewStateMachine.setState('spike-hit')
          //      return
          //   }
            
          //   if (this.obstacles.is('enemy', body)) {
          //     console.log(body);
          //     this.lastEnemy = body.gameObject
          //     //console.log(this.sprite.body.position.y);
          //     //console.log(this.lastEnemy.body.position.y);
          //     if (this.sprite.body.position.x < this.lastEnemy.body.position.x) {
          //       console.log(this.lastEnemy);            
          //       events.emit('alien-down', this.lastEnemy)
                
          //     } else {
                
          //       this.NewStateMachine.setState('enemy-hit')
          //     }
             
          //      return
          //   }

          //   if (!gameObject) {
          //     return
          //   }
          //   if (gameObject instanceof Phaser.Physics.Matter.TileBody) {
          //     if (this.NewStateMachine.isCurrentState('jump')) {
          //       this.NewStateMachine.setState('idle')
          //     }
          //     return
          //   }
          //     const sprite = gameObject;
          //     const type = gameObject.getData('type')
          //     switch (type) {
          //       case 'energia':
          //         events.emit('star-collected')
          //         gameObject.destroy();
          //         events.emit('mensaje-ayuda-energia')
          //         break;

          //         case 'llave':
          //           events.emit('key-collected')
          //           gameObject.destroy();
          //           events.emit('mensaje-ayuda-llave')
          //           this.key = true;
          //           break;

          //           case 'corazon':
          //             events.emit('heart-collected')
          //             gameObject.destroy();
          //             events.emit('mensaje-ayuda-corazon')
          //             break;
                    
          //           case 'cueva':
          //            console.log('collyde with vueva')
          //           if (this.key) {
          //             events.emit('cueva-in')
          //           }
          //           else{
          //             events.emit('cueva-stop')
          //           }
                   
          //       default:
          //         break;

                  
          //     }
              
          // })
    }

    idleOnEnter(){
      this.play('player-idle')
      this.setVelocity(0,0)
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
      const speed = 200

      if (this.cursors.left.isDown) {
        this.flipX = true;
        this.setVelocityX(-speed);
        if (this.cursors.up.isDown) {
          this.NewStateMachine.setState('jump');
        }
      }
      else if (this.cursors.right.isDown) {
        this.flipX = false;
        this.setVelocityX(speed);
        if (this.cursors.up.isDown) {
          this.NewStateMachine.setState('jump');
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
      }
      if (this.body.onFloor()){
        this.NewStateMachine.setState('idle')    
      }    }

    spikeOnEnter() {
      this.setVelocityY(-3)
      this.setVelocityX(-3)
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
      events.emit('minus-health',this.damage)
      this.NewStateMachine.setState('idle')
    }

    enemyHitOnEnter() {
     // console.log(this.lastEnemy);
      //console.log(this.lastEnemy.body);
      //console.log(this.lastEnemy.body.gameObject);
      //con este atributo podemos saber el tipo de enemigo que tenemos de esta manera poder restar mas o menos 
      //console.log(this.lastEnemy.body.gameObject.texture.key);
      let tipo=this.lastEnemy.body.gameObject.texture.key;
      
      if (this.lastEnemy) {
        if (this.sprite.body.position.x < this.lastEnemy.body.position.x){
          this.sprite.setVelocityX(-20)
        }
        else{
          this.sprite.setVelocityX(20)
        }
      } else {
        this.sprite.setVelocityX(-20)
      }

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
          this.sprite.setTint(color)
        }
      })
      
      switch(tipo){
        case 'alien':
          this.damage=1;
          events.emit('minus-health')
          break;
        case 'alien1':
          this.damage=2;
          events.emit('minus-health2')
          break;
          
      }
      this.NewStateMachine.setState('idle')
    }

    enemyDownOnEnter() { 

      this.sprite.setVelocityY(-3)
      this.sprite.setVelocityX(-3)

  

      this.NewStateMachine.setState('idle')
    }
    setBullets(bullets){
      this.bullets = bullets
    }
    shoot(){
      console.log(this.body.deltaX());
      // sprite.angle = sprite.body.angle;
      // console.log(this.sprite.body);
      console.log(this.scaleX);
      // console.log(this.sprite.rotation);
      const vector = new Phaser.Math.Vector2(0,0)
      if (this.body.deltaX() < 0) {
        vector.x = -1
      }else {
        vector.x = 1
      }
      this.bullet = this.bullets.get(this.x, this.y, 'bullet');
      this.bullet.setActive(true)
      this.bullet.setVisible(true)
      this.bullet.body.allowGravity = false
      this.bullet.setRotation(vector.angle())

      // this.bullet.x += vector.x = 16 



      this.bullet.setVelocityX(vector.x * 500, 300)
      

    }
    handleBulletsGroundCollision(bullet, ground) {
      bullet.destroy()
      ground.destroy();
    }
    update(dt){
      this.NewStateMachine.update(dt);
      if (this.cursors.space.isDown) {
        this.shoot();
      }
    }

    createAlienAnimation(){

      this.anims.create({
        key: 'player-idle',
        frames: [{key: 'hero', frame: 'Hero_Boy_Idle1.png'}]
      });
      // this.sprite.anims.create({
      //   key:'player-idle',
      //   frameRate: 7,
      //   frames:this.sprite.anims.generateFrameNames('hero', {
      //     start: 1,
      //     end: 13,
      //     prefix: 'Hero_Boy_Idle',
      //     suffix: '.png'
      //   }),
      //   repeat: -1
      // })
  
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
  



 }
