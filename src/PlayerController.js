

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
        this.flipFlop;
        this.scene.cameras.main.startFollow(this, false, 1, 1, 0, 0);
        this.scene.cameras.main.setDeadzone(400, 350);

        this.scene.cameras.main.shake(200, 0.05, true, Phaser.Cameras.SHAKE_HORIZONTAL, false);

        this.scene.cameras.main.zoom = 0.3;
        // this.scene.cameras.main.setBounds(0, 0, 16000, 3000); //Y = 250
        // this.scene.cameras.main.zoom = 1;
        // this.scene.cameras.main.startFollow(this, false, 0.05, 0.5);
        // this.scene.cameras.main.fadeIn(1000);

        // .setScale('0.8')  
        this.scene.physics.add.collider(this,this.scene.groundLayer)
        // this.scene.cameras.main.startFollow(this)

        // console.log(this);
        // console.log(this.displayWidth());

        this.scaleX = -1
        //Establecemos tamaño y hitbox
        // this.setSize(this.width,this.height);
        // this.body.setSize(this.width,this.height);
        // this.body.setOffset(128,128);
        // this.body.setSize(this.width/2,this.height/2);
        // this.body.setSize(this.width,this.height);
        this.setOffset(this.width,0);
        // this.body.updateFromGameObject();
        // this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.cursors = this.scene.input.keyboard.addKeys({
          up:Phaser.Input.Keyboard.KeyCodes.UP,
          down:Phaser.Input.Keyboard.KeyCodes.DOWN,
          left:Phaser.Input.Keyboard.KeyCodes.LEFT,
          right:Phaser.Input.Keyboard.KeyCodes.RIGHT,
          space:Phaser.Input.Keyboard.KeyCodes.SPACE,
          E:Phaser.Input.Keyboard.KeyCodes.E,
          ESC:Phaser.Input.Keyboard.KeyCodes.ESC
        });
        

        // this.obstacles = this.scene;
        this.hasKey = false;
        this.lastEnemy;
        this.damage;
        this.energy = 0;
        this.energyPlus = 0;
        this.health = 6;
        // this.bullets = this.scene.physics.add.group({
        //   classType: Phaser.Physics.Arcade.Image,
        //   frameQuantity:50,
        //     active: false,
        //     visible: false,
        //     key: 'bullet'
        // });
        this.bullets = this.scene.physics.add.group({
          classType: Phaser.Physics.Arcade.Image 
        });
        this.scene.physics.add.collider(this.bullets,this.scene.groundLayer,this.handleBulletsGroundCollision,undefined,this.scene)
        this.scene.physics.add.overlap(this,this.scene.enemies,this.handlePlayerEnemiesCollision,undefined,this.scene)

        

        this.scene.physics.add.collider(this,this.scene.objects,this.handleheartsplayer,undefined,this)

        this.createAlienAnimation();

        // this.scene.physics.add.overlap(this, this.scene.arrayEnemies,(player, enemigo)=>{
        //   console.log(player);
        //   console.log(enemigo);
        // })


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


      //     this.scene.physics.add.collider( this, this.scene.enemies, (player, enemigo) => {
        
           
      //  }
      
      
      // if (player.body.deltaX() > 0 && !enemigo.body.deltaX()<0) {
      //        console.log('pedo');
      //      }
      //      if (player.body.deltaX() > 0 && enemigo.body.deltaX()<0) {
      //       player.setState('enemy-hit')
      //     }
      //     //   if (player.body.deltaY()>enemigo.body.deltaY()) {
      
      //     //    enemigo.destroy()
      //     //  }else if (player.body.deltaX()<enemigo.body.deltaX()) {
      
      //     //   player.setState('enemy-hit')
      //     // }
      //       // enemigo.destroy()
          // });


    }
    handlePlayerEnemiesCollision(player,enemigo){
      console.log('Poisiton PBE ' + player.body.y);
      console.log('Poisiton PE ' + player.y);
      console.log('Poisiton PDBE ' + player.body.deltaY());
      console.log('Poisiton BE ' + enemigo.body.y);
      console.log('Poisiton E ' + enemigo.y);
      console.log('Poisiton DBE ' + enemigo.body.deltaY());
    
      if (player.body.deltaY()>enemigo.body.deltaY()) {
        player.setVelocityY(-400)
        // events.emit('alien-down', enemigo)
        // enemigo.setState('death')
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
      // console.log('Poisiton DPE ' + this.body.deltaY());
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
      // console.log('Poisiton PBE ' + this.body.y);
      // console.log('Poisiton PE ' + this.y);
      // console.log('Poisiton DPE ' + this.body.deltaY());

      
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
      }else if (this.body.onFloor()){
        this.NewStateMachine.setState('idle')    
      }   
    
    }

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
      events.emit('heart',this.health)
      this.NewStateMachine.setState('idle')
    }

    enemyHitOnEnter(conect) {
      console.log(conect);
     // console.log(this.lastEnemy);
      //console.log(this.lastEnemy.body);
      //console.log(this.lastEnemy.body.gameObject);
      //con este atributo podemos saber el tipo de enemigo que tenemos de esta manera poder restar mas o menos 
      //console.log(this.lastEnemy.body.gameObject.texture.key);
      // let tipo=this.lastEnemy.body.gameObject.texture.key;
      
      // if (this.lastEnemy) {
      //   if (this.sprite.body.position.x < this.lastEnemy.body.position.x){
      //     this.sprite.setVelocityX(-20)
      //   }
      //   else{
      //     this.sprite.setVelocityX(20)
      //   }
      // } else {
      //   this.sprite.setVelocityX(-20)
      // }

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
      // log
      // switch(tipo){
      //   case 'alien':
      //     this.damage=1;
      //     events.emit('minus-health')
      //     break;
      //   case 'alien1':
      //     this.damage=2;
      //     events.emit('minus-health2')
      //     break;
          
      // }

    }
    enemyHitOnUpdate() {
      
    }

    enemyDownOnEnter() { 

      this.sprite.setVelocityY(-3)
      this.sprite.setVelocityX(-3)

  

      this.NewStateMachine.setState('idle')
    }
    setBullets(bullets){
      this.bullets = bullets
    }

    handleheartsplayer(player,objeto){

      switch (objeto.img) {
        case 'energia':
          this.energy += 1
          events.emit('energy', this.energy)
          objeto.destroy();
          events.emit('mensaje-ayuda-energia')
        break;
        case 'energiaRosa':
          this.energy += 1
          events.emit('energyPlus', this.energy)
          objeto.destroy();
          events.emit('mensaje-ayuda-energia')
        break;
        case 'corazon':
          if (this.health < 6){
            this.health += 1
          }          
          events.emit('heart',this.health)
          objeto.destroy();
          events.emit('mensaje-ayuda-corazon')
        break;
        case 'llave':
          events.emit('key-collected')
          objeto.destroy();
          events.emit('mensaje-ayuda-llave')
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
          
         objeto.destroy();
        break;
        
        case 'cueva':
          // this.health += 1
          // events.emit('cueva-collected',this.health)
          // objeto.destroy();
          // events.emit('mensaje-ayuda-corazon')
        break;
        case 'trampas':
          trampas(player, objeto);
        break;
        default:
          break;
      }
    }

    trampas(player, objeto){
      switch(objeto.img){
        case 'acido':
          this.health -=  1;
          events.emit('heart',this.health)
        break;
        case 'pinchos':
          this.health -= 2;
          events.emit('heart', this.health)
        break;
        case 'lava':
          this.health -= 1;
          events.emit('heart', this.health)
        break;
    }
      player.body.setVelocityY(-200);
      player.NewStateMachine.setState('enemy-hit');
    }

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
      this.scene.physics.add.collider(this.bullet,this.scene.enemies,this.handleBulletsEnemiesCollision,undefined,this)
      // this.anims.play('bullet')
      this.bullet.setActive(true)
      this.bullet.setVisible(true)
      this.bullet.body.allowGravity = false
      this.bullet.setRotation(vector.angle())

      // this.bullet.x += vector.x = 16 



      this.bullet.setVelocityX(vector.x * 500, 300)
      

    }
    handleBulletsGroundCollision(bullet, ground) {
      bullet.destroy() 
    }
    handleBulletsEnemiesCollision(bullet, enemy) {
      console.log(bullet);
      console.log(enemy);      
      bullet.destroy()
      enemy.triggerTimer.remove()
      enemy.destroy();
    }
    update(dt){

      this.NewStateMachine.update(dt);
      if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
        this.shoot();
      }      
      if (!this.body.onFloor() && this.energy >0 && Phaser.Input.Keyboard.JustDown(this.cursors.E)) {
        this.setVelocityY(-600)
        this.energy = this.energy - 1
        events.emit('energy', this.energy)
      }
      events.emit('heart',this.health)

      if (this.health <= 0) {
        console.log('player death');
      }
    }

    createAlienAnimation(){

      // this.anims.create({
      //   key: 'player-idle',
      //   frames: [{key: 'hero', frame: 'Hero_Boy_Idle8.png'}]
      // });
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

      // this.anims.create({
      //   key:'bullet',
      //   frameRate: 3,
      //   frames:this.anims.generateFrameNames('hero', {
      //     start: 1,
      //     end: 3,
      //     prefix: 'bullet_',
      //     suffix: '.png'
      //   }),
      //   repeat: -1
      // })

    }
  
    damage(){
      console.log('pedo');
      this.health -= 1;
    }


 }
