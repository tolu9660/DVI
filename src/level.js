//import Platform from './platform.js';
//import Player from './player.js';
//import piedra from './piedra.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
    
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    //this.alien = this.physics.matter.sprite;
    this.isTouchingGround = false;
    this.data = this.matter.ICollisionPair;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    
    
    this.createAlienAnimation();
    
    //cosas de mapa
    this.map = this.make.tilemap({ key: 'level1' });
    //this.map = this.make.tilemap({ key: 'tilemap' });
    const tileset1 = this.map.addTilesetImage('suelo','suelo');
    const tileset2 = this.map.addTilesetImage('subsuelo','subsuelo');
    //const tileset1 = this.map.addTilesetImage('suelo_jesus', 'ground')
    this.groundLayer = this.map.createLayer('ground', [tileset1, tileset2]);
    
    //this.groundLayer.setCollisionByProperty({collides: true});
    //this.groundLayer = this.map.createLayer('ground', [tileset1])
    this.groundLayer.setCollisionByProperty({collides : true})
    
    const objectsLayer = this.map.getObjectLayer('objects')

    objectsLayer.objects.forEach(objData => {
      const {x = 0, y = 0, name, width = 0} = objData
      switch (name) {
        case 'alien_spawn':
         { this.alien = this.matter.add.sprite(x + (width*0.5),y, 'alien')
            .play('player-idle')
            .setFixedRotation();

            this.alien.setOnCollide((data) => {
              this.isTouchingGround = true;
             })
                //HAcemos que siga al personaje
            this.cameras.main.startFollow(this.alien)
            }
          break;
      
        default:
          break;
      }
    })
    
    this.matter.world.convertTilemapLayer(this.groundLayer);

    //cosas de alien
    //this.player = new Player(this, 200, 300);   

    const { width, height } = this.scale;

    //this.spawn();
    //this.spawnCalavera();
  }

  update(){

    if (!this.alien) {
      return
    }
    const speed = 5

    if (this.cursors.left.isDown) {
      console.log('left');
      this.alien.flipX = true;
      this.alien.setVelocityX(-speed);
      this.alien.play('player-walk', true)
    }
    else if (this.cursors.right.isDown) {
      this.alien.flipX = false;
      this.alien.setVelocityX(speed);
      this.alien.play('player-walk', true)
    }
    else {
      this.alien.setVelocityX(0);
      this.alien.play('player-idle', true)
    }

    //con esto comprobamos que no esta en contacto con algo asi evitamos que cuando pulsemos espacio en el aire vuelva a saltar
    //esto quiza nos interese en algun modo vuelo

    
    if (this.cursors.up.isDown && this.isTouchingGround) {
      this.alien.setVelocityY(-9)
      this.isTouchingGround = false
    }


  }


 createAlienAnimation(){

    this.anims.create({
      key:'player-idle',
      frameRate: 7,
      frames:this.anims.generateFrameNames('alien', {
        start: 1,
        end: 3,
        prefix: 'predatormask_idle_',
        suffix: '.png'
      }),
      repeat: -1
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
  }

  

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  
  //spawn(from = null) {
    //Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  //}
  //spawnCalavera(from = null) {
    //Phaser.Math.RND.pick(from || this.bases.children.entries).spawnCalavera();
  //}
  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  /*starPickt (base) {
    this.player.point();    
    if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
  }
 calaveraPickt (base) {
    this.player.pierdeVida();
    if (this.player.life == 0) {
      this.scene.start('end');
    }
    else {
      let s = this.bases.children.entries;
      this.spawnCalavera(s.filter(o => o !== base));

    }
  }*/
}