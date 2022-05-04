
import PlayerController from './PlayerController.js'
import enemyController from './EnemyController1.js'
import ObstaclesController from './ObstaclesController.js';

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
    this.obstacles = new ObstaclesController()
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    
    this.scene.launch('game-ui');

    
    //cosas de mapa
    this.map = this.make.tilemap({ key: 'level1' });
    //this.map = this.make.tilemap({ key: 'tilemap' });
    const tileset1 = this.map.addTilesetImage('acido','acido');
    const tileset2 = this.map.addTilesetImage('texturas','texturas');
 
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
        case 'alien_spawn': { 
          this.alien = this.matter.add.sprite(x + (width*0.5),y, 'hero')
          .setScale('0.5')  
          .setFixedRotation();

          

          this.playerController = new PlayerController(
            this,
            this.alien, 
            this.cursors, 
            this.obstacles
            )

          //HAcemos que siga al personaje
          this.cameras.main.startFollow(this.alien)
          
         // this.matter.add.sprite(x, y - 50, 'star')

          break;
        }
        case 'energia': {
          const star = this.matter.add.sprite(x, y, 'energia',undefined,{
            isStatic:true,
            isSensor:true
          })
          star.setScale('0.5','0.5')
          star.setData('type', 'energia')
          break;
        }
        case 'spikes':
          const spikes = this.matter.add.rectangle(x+ (width*0.5), y+(height*0.5), width, height, {
            isStatic: true
          })
          this.obstacles.add('spikes', spikes)
          break;
          case 'llave': {
            const key = this.matter.add.sprite(x, y, 'llave',undefined,{
              isStatic:true,
              isSensor:true,
            })
            key.setScale('0.5', '0.5')
            key.setData('type', 'llave')
            break;
          }
          case 'corazon': {
            const key = this.matter.add.sprite(x, y, 'corazon',undefined,{
              isStatic:true,
              isSensor:true,
            })
            key.setScale('0.5', '0.5')
            key.setData('type', 'corazon')
            break;
          }
          case 'enemigo': { 
            this.enemy = this.matter.add.sprite(x ,y, 'alien')
            .setScale('0.7')  
            .setFixedRotation()
              

              this.enemyController = new enemyController(
                this,
                this.enemy
                )
            break;
          }
      }
      
    })
    
    this.matter.world.convertTilemapLayer(this.groundLayer);

  }

  update(t, dt){
    if (!this.playerController) {
      return
    }    
    this.playerController.update(dt);
    this.enemyController.update(dt);
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