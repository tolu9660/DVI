

import { sceneEvents as events } from './EventsCenter.js';

import NewStateMachine from './newStateMachine.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class PlayerController {
  
 

    constructor(scene,sprite, cursors, obstacles){
      // super({ key: 'player-controller' });
        this.scene = scene,
        this.sprite = sprite;
        this.cursors = cursors;
        this.obstacles = obstacles;
        this.key = false;
        this.lastEnemy;
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
          })
          .addState('enemy-down', {
            onEnter: this.enemyDownOnEnter,
          })
          .setState('idle');

          this.sprite.setOnCollide((data) => {
            const body = data.bodyB;
            const gameObject = body.gameObject
            if (this.obstacles.is('spikes', body)) {
              this.NewStateMachine.setState('spike-hit')
               return
            }
            
            if (this.obstacles.is('enemy', body)) {

              this.lastEnemy = body.gameObject
              console.log(this.sprite.body.position.y);
              console.log(this.lastEnemy.body.position.y);
              if (this.sprite.body.position.x < this.lastEnemy.body.position.x) {
                console.log(this.lastEnemy);            
                events.emit('alien-down', this.lastEnemy)
                
              } else {
                
                this.NewStateMachine.setState('enemy-hit')
              }
             
               return
            }

            if (!gameObject) {
              return
            }
            if (gameObject instanceof Phaser.Physics.Matter.TileBody) {
              if (this.NewStateMachine.isCurrentState('jump')) {
                this.NewStateMachine.setState('idle')
              }
              return
            }
              const sprite = gameObject;
              const type = gameObject.getData('type')
              switch (type) {
                case 'energia':
                  events.emit('star-collected')
                  gameObject.destroy();
                  events.emit('mensaje-ayuda-energia')
                  break;

                  case 'llave':
                    events.emit('key-collected')
                    gameObject.destroy();
                    events.emit('mensaje-ayuda-llave')
                    this.key = true;
                    break;

                    case 'corazon':
                      events.emit('heart-collected')
                      gameObject.destroy();
                      events.emit('mensaje-ayuda-corazon')
                      break;
                    
                    case 'cueva':
                     console.log('collyde with vueva')
                    if (this.key) {
                      events.emit('cueva-in')
                    }
                    else{
                      events.emit('cueva-stop')
                    }
                   
                default:
                  break;

                  
              }
              
          })
    }

    idleOnEnter(){
      this.sprite.play('player-idle')
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
      this.sprite.play('player-walk')
    }
    walkOnUpdate(){
      const speed = 5

      if (this.cursors.left.isDown) {
        this.sprite.flipX = false;
        this.sprite.setVelocityX(-speed);
      }
      else if (this.cursors.right.isDown) {
        this.sprite.flipX = true;
        this.sprite.setVelocityX(speed);
      }
      else {
        this.NewStateMachine.setState('idle')
      }
      if (this.cursors.up.isDown) {
        this.NewStateMachine.setState('jump');
      }
    }
    walkOnExit() {
      this.sprite.stop();
    }

    jumpOnEnter(){
      this.sprite.setVelocityY(-9)
    }

    jumpOnUpdate(){
      const speed = 5

      if (this.cursors.left.isDown) {
        this.sprite.flipX = false;
        this.sprite.setVelocityX(-speed);
   
      }
      else if (this.cursors.right.isDown) {
        this.sprite.flipX = true;
        this.sprite.setVelocityX(speed);
      
      }
    }

    spikeOnEnter() {
      this.sprite.setVelocityY(-3)
      this.sprite.setVelocityX(-3)
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
      events.emit('minus-health')
      this.NewStateMachine.setState('idle')
    }

    enemyHitOnEnter() {
      console.log(this.lastEnemy);
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
      events.emit('minus-health')
      this.NewStateMachine.setState('idle')
    }

    enemyDownOnEnter() { 

      this.sprite.setVelocityY(-3)
      this.sprite.setVelocityX(-3)

  

      this.NewStateMachine.setState('idle')
    }


    update(dt){
      this.NewStateMachine.update(dt);
    }

    createAlienAnimation(){


      this.sprite.anims.create({
        key:'player-idle',
        frameRate: 7,
        frames:this.sprite.anims.generateFrameNames('hero', {
          start: 1,
          end: 13,
          prefix: 'Hero_Boy_Idle',
          suffix: '.png'
        }),
        repeat: -1
      })
  
      this.sprite.anims.create({
        key:'player-walk',
        frameRate: 5,
        frames:this.sprite.anims.generateFrameNames('hero', {
          start: 0,
          end: 5,
          prefix: 'Hero-Boy-Run-',
          suffix: '.png'
        }),
        repeat: -1
      })

    }
  



 }
