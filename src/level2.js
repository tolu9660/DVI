//import Platform from './platform.js';
//import Player from './player.js';
////import piedra from './piedra.js';
import PlayerController from './PlayerController.js'
import enemyController from './EnemyController.js'
import corazon from './corazon.js';
import ObstaclesController from './ObstaclesController.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level2 extends Phaser.Scene {

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level2' });
    
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.obstacles = new ObstaclesController();
    this.arrayEnemies=[];
  
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
    //const tileset3 = this.map.addTilesetImage('Fondo','Fondo');

    
    
    this.groundLayer = this.map.createLayer('ground', [tileset2, tileset1]);
    this.plataformasLayer = this.map.createLayer('plataformas', [tileset2, tileset1]);
    //this.backgroundLayer = this.map.createLayer('background', tileset3);
    
    
    this.groundLayer.setCollisionByProperty({collides: true});
    this.plataformasLayer.setCollisionByProperty({collides: true});

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
          
      

          break;
        }
        case 'c':{
            this.cora = this.matter.add.sprite(x + (width*0.5),y, 'cora')
            .setScale('0.5')  
            .setFixedRotation();
            this.cora = new corazon(
                this,
                this.cora
            )
    
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
        
      }
      
    })
    
    const enemigos = this.map.getObjectLayer('enemigos')
    this.i=0;
    
    for (let step = 0; step < enemigos.objects.length; step++){
      const {x = 0, y = 0, name, width1 = 0} = enemigos.objects[step]
          this.enemy = this.matter.add.sprite((x*0.9) + (width1*0.9),y, 'alien')
          .setScale('0.7')  
          .setFixedRotation()
          this.enemyController = new enemyController(   this,  this.enemy      ) ;
          this.arrayEnemies[step]=this.enemyController;
          this.i++;       
    }
    
    this.matter.world.convertTilemapLayer(this.groundLayer);

  }

  update(t, dt){
    if (!this.playerController) {
      return
    }    
    this.playerController.update(dt);
    if(this.arrayEnemies.length!=0){
      for(let e=0; e<this.i; e++){
        
      this.arrayEnemies[e].update(dt);

      }
    }
    
  }


 
  
}