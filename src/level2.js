//import Platform from './platform.js';
//import Player from './player.js';
////import piedra from './piedra.js';
import PlayerController from './PlayerController.js'
import enemyController from './EnemyController1.js'
import corazon from './corazon.js';
import ObstaclesController from './ObstaclesController.js';
import energia from './energia.js';
import PlataformaMovil from './plataformaMovil.js';
import llave from './llave.js';
import cueva from './cueva.js'


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
    this.arrayObjects=[];
    this.j=0;
  
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  /*Hola esto es una prueba */
  create() {
    
    this.scene.launch('game-ui');
    //const backgrounImage = this.add.image(0, 0, 'Fondo').setOrigin(0,0);

    //cosas de mapa
    this.map = this.make.tilemap({ key: 'level2' });
    //this.map = this.make.tilemap({ key: 'tilemap' });

    const tileset1L = this.map.addTilesetImage('suelo','suelo');
    const tileset2L = this.map.addTilesetImage('subsuelo','subsuelo');
    const tileset3L = this.map.addTilesetImage('suelo1','suelo1');
    const lava = this.map.addTilesetImage('lavas','lavas');
    const sueloTransparente = this.map.addTilesetImage('sueloT','sueloT');



    //const tileset1 = this.map.addTilesetImage('suelo_jesus', 'ground')
    //this.groundLayer = this.map.createLayer('ground', [tileset1, tileset2, tileset3,sueloTransparente,lava]);
    const backgroundImage=this.add.image(0,0,'Fondo').setOrigin(0,0);
    const tileset1 = this.map.addTilesetImage('acido','acido');
    const tileset2 = this.map.addTilesetImage('texturas','texturas');
    this.groundLayer = this.map.createLayer('ground', [tileset1, tileset2,sueloTransparente]);
    this.plataformasLayer = this.map.createLayer('plataformas', [tileset1, tileset2]);



    //this.groundLayer.setCollisionByProperty({collides: true});
    //this.groundLayer = this.map.createLayer('ground', [tileset1])
    this.groundLayer.setCollisionByProperty({collides : true})    
    
    this.groundLayer.setCollisionByProperty({collides: true});
    this.plataformasLayer.setCollisionByProperty({collides: true});

    const objectsLayer = this.map.getObjectLayer('objects')
    
    objectsLayer.objects.forEach(objData => {
      const {x = 0, y = 0, name, width = 0, height = 0} = objData
      switch (name) {
        case 'alien_spawn': { 
          this.alien = this.matter.add.sprite(x + (width*0.5),y, 'hero')
          .setScale('0.4')  
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

        case 'cueva':{
          this.cueva = this.matter.add.sprite(x,y, 'cueva')
          .setStatic(true)
          .setSensor(true)
          .setFixedRotation()

          this.cueva.setData('type', 'cueva')
          this.c = new cueva(
              this,
              this.cueva
          )
        this.arrayObjects[this.j]=this.c;
        this.j++;
          break;
        }
        case 'corazon':{
            this.corazon = this.matter.add.sprite(x + (width),y, 'corazon',undefined,{
              isStatic:true,
              isSensor:true
            })
            .setScale('1.5')  
            .setFixedRotation();
            this.corazon.setData('type', 'corazon')
            this.c = new corazon(
                this,
                this.corazon
            )
          this.arrayObjects[this.j]=this.c;
          this.j++;
            break;
        }
        case 'pm':{
          this.pm = this.matter.add.sprite(x + (width),y, 'pm')
          .setScale('1')  
          .setFixedRotation();
          this.aux = new PlataformaMovil(this,this.pm)
        this.arrayObjects[this.j]=this.aux;
        this.j++;
          break;
      }
        case 'energia':{
          this.ene = this.matter.add.sprite(x + (width*0.5),y, 'ene',undefined,{
            isStatic:true,
            isSensor:true
          })
          .setScale('1.5')  
          .setFixedRotation();
          this.ene.setData('type', 'energia')
          this.c = new energia (
              this,
              this.ene
          )
        this.arrayObjects[this.j]=this.c;
        this.j++;
          break;
      }
      
        case 'spikes':
          const spikes = this.matter.add.rectangle(x+ (width*0.5), y+(height*0.5), width, height, {
            isStatic: true
          })
          this.obstacles.add('spikes', spikes)
          break;
          case 'llave': {

            this.k = this.matter.add.sprite(x + (width),y, 'llave')
            .setScale('1.5')  
            .setFixedRotation();
            this.k.setData('type', 'llave')
            this.c = new llave(this,this.k)
            this.arrayObjects[this.j]=this.c;

            this.j++;
        
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
          this.obstacles.add('enemy', this.enemy.body)
          this.enemyController = new enemyController(this,this.enemy) ;
          this.arrayEnemies[step]=this.enemyController;
          this.i++;       
    }
    
    /*const corazones = this.map.getObjectLayer('corazones')
    this.j=0;
    for (let step = 0; step < corazones.objects.length; step++){
      const {x = 0, y = 0,width = 0} = corazones.objects[step]
         
          let cora = this.matter.add.sprite(x + (width*0.5),y, 'cora')
          .setScale('0.5')  
          .setFixedRotation();
         let aux = new corazon(  this,cora );
        this.arrayObjects[step]=aux;
        this.j++;
      
    }*/
    this.matter.world.convertTilemapLayer(this.groundLayer);

  }

  update(t, dt){
    if (!this.playerController) {
      return
    }    
    this.playerController.update(dt);
    if(this.arrayObjects.length!=0){
      for(let e=0; e<this.j; e++){
        
        this.arrayObjects[e].actu(dt);
    }
    }
    if(this.arrayEnemies.length!=0){
      for(let e=0; e<this.i; e++){
        
      this.arrayEnemies[e].update(dt);

      }
    }
    
  }


 
  
}