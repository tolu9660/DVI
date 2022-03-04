//import Platform from './platform.js';
//import Player from './player.js';
////import piedra from './piedra.js';
import PlayerControler from './PlayerController.js'

import { sceneEvents } from './EventsCenter.js'; 

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
    // this.playerController = new PlayerControler();
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    
    this.scene.run('game-ui');

    
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

    this.map.createLayer('obstacles',tileset1)
    
    const objectsLayer = this.map.getObjectLayer('objects')

    objectsLayer.objects.forEach(objData => {
      const {x = 0, y = 0, name, width = 0, height = 0} = objData
      switch (name) {
        case 'alien_spawn':
         { this.alien = this.matter.add.sprite(x + (width*0.5),y, 'alien')
            .setFixedRotation();

            this.playerController = new PlayerControler(this.alien, this.cursors)

 

                //HAcemos que siga al personaje
            this.cameras.main.startFollow(this.alien)
            }
          break;
          case 'spikes':{
           console.log('pedo');
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

  update(t, dt){
    //console.log(this.playerController.statesPlayer.state)
    if (!this.playerController) {
      return
    }    
    this.playerController.update(dt);
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