

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
          .setState('idle');

          this.sprite.setOnCollide((data) => {
            const body = data.bodyB;
            const gameObject = body.gameObject
            console.log(this.obstacles.is('spikes', body))
            if (this.obstacles.is('spikes', body)) {
              this.NewStateMachine.setState('spike-hit')
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
                    // events.emit('heart-collected')
                    // gameObject.destroy();
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
        // this.alien.play('player-walk', true)
      }
      else if (this.cursors.right.isDown) {
        this.sprite.flipX = true;
        this.sprite.setVelocityX(speed);
        // this.alien.play('player-walk', true)
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

    update(dt){
      this.NewStateMachine.update(dt);
    }

    createAlienAnimation(){

      // this.sprite.anims.create({
      //   key:'player-idle',
      //   frameRate: 7,
      //   frames:this.sprite.anims.generateFrameNames('alien', {
      //     start: 1,
      //     end: 3,
      //     prefix: 'predatormask_idle_',
      //     suffix: '.png'
      //   }),
      //   repeat: -1
      // })
  
      // this.sprite.anims.create({
      //   key:'player-walk',
      //   frameRate: 10,
      //   frames:this.sprite.anims.generateFrameNames('alien', {
      //     start: 1,
      //     end: 6,
      //     prefix: 'predatormask__0006_walk_',
      //     suffix: '.png'
      //   }),
      //   repeat: -1
      // })

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
  



  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
  
  constructor(scene, x, y) {
    super(scene, x, y, 'alien');
    
    this.score = 0;
    this.scene.add.existing(this);
    //this.scene.physics.add.existing(this);
    //Creacion de contador de vida
    this.life = 3;
    this.scene.add.existing(this);
    //this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    //this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.labelPuntos= this.scene.add.text(10, 10, "");
    this.labelLife = this.scene.add.text(10, 40, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    //this.updateGemas();
  
    //Configuracion teclas A W S D
    this.keyA=this.scene.input.keyboard.addKey('A');
    this.keyS=this.scene.input.keyboard.addKey('S');
    this.keyD=this.scene.input.keyboard.addKey('D');
    this.keyW=this.scene.input.keyboard.addKey('W');

    //this.updateLife();
  }

  /*createAlienAnimation(){

    this.anims.create({
      key:'player-idle',
      frames: [{key:'alien', frame:'predatormask__0000_idle_1.png'}]
    })

    this.anims.create({
      key:'player-walk',
      frameRate: 10,
      frames:this.anims.generateFrameNames('alien', {
        start: 1,
        end: 6,
        prefix: 'predatormask__0006_walk_',
        suffix: '.png'
      }),
      repeat: -1
    })
  }*

  **
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   *
  point() {
    this.score++;
    this.updateGemas();
   
}
  pierdeVida(){
    this.life--;
    this.updateLife();
  }
  
  **
   * Actualiza la UI con la puntuación actual
   *
  updateGemas() {
    this.labelPuntos.text = 'Gemas: ' + this.score;
  }
  updateLife() {
    this.labelLife.text = 'Vida: ' + this.life;
  }
  **
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   *
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if (this.cursors.space.isDown || this.keyW.isDown && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
    }
    if (this.cursors.left.isDown || this.keyA.isDown) {
      this.body.flipX = true;
      this.body.setVelocityX(-this.speed);
      this.body.play('player-walk', true);
    }
    else if (this.cursors.right.isDown || this.keyD.isDown) {
      this.body.flipX = false;
      this.body.setVelocityX(this.speed);
      this.body.play('player-walk', true);
    }
    else {
      this.body.setVelocityX(0);
      this.body.play('player-idle', true);
    }
  } */
}
