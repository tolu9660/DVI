
import PlayerController from './PlayerController.js'
import enemyController from './EnemyController.js'

import corazon from './corazon.js';
import ObstaclesController from './ObstaclesController.js';
import energia from './energia.js';
import PlataformaMovil from './plataformaMovil.js';
import llave from './llave.js';
import cueva from './cueva.js'
import EnemyController1 from './EnemyController1.js';
import EnemyController2 from './EnemyController2.js';
import EnemyController3 from './EnemyController3.js';



/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class LevelClass extends Phaser.Scene {

  /**
   * Constructor de la escena
   */
  constructor(LevelKey) {
    super({ key: LevelKey });
    
    this.groundLayer;
    this.plataformasLayer;
    
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.obstacles = new ObstaclesController();
    this.arrayEnemies=[];
    this.arrayObjects=[];
    this.ArrayTileset=[];
    this.j=0;

  
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  /*Hola esto es una prueba */
  create(KeyLevel,Tilesets,BackG ) {
    
    this.scene.launch('game-ui');
    this.map = this.make.tilemap({ key: KeyLevel });
    
    const backgroundImage=this.add.image(0,0,BackG).setOrigin(0,0);

    for(let i=0; i<Tilesets.length; i++){
      this.ArrayTileset[i]=this.map.addTilesetImage(Tilesets[i],Tilesets[i]);
    }
    this.cargarObjetos();
  }
  creacionCapas(Capas){
    let c=[];
      for(let e=0; e<Capas.length;e++){

        for(let i=0; i<Capas[e][1].length; i++){
          c[i]=this.ArrayTileset[i];
        }
        if(Capas[e][0]=='ground'){
        this.groundLayer = this.map.createLayer(Capas[e][0],c);
        }
        if(Capas[e][0]=='plataformas'){
          this.plataformasLayer = this.map.createLayer(Capas[e][0],c);
        }   
    }
    this.groundLayer.setCollisionByProperty({collides : true});    
    this.matter.world.convertTilemapLayer(this.groundLayer);

  }
  cargarObjetos(){
    const objectsLayer = this.map.getObjectLayer('objects')
    
    objectsLayer.objects.forEach(objData => {
      const {x = 0, y = 0, name, width = 0, height = 0} = objData
      switch (name) {
        case 'alien_spawn': { 
          this.alien = this.matter.add.sprite(x + (width),y, 'hero')
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
            .setScale('1.2')  
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
          this.ene = this.matter.add.sprite(x + (width),y, 'ene',undefined,{
            isStatic:true,
            isSensor:true
          })
          .setScale('1.2')  
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
    
   

  }
  cargaEnemigos(Tipo){
    const enemigos = this.map.getObjectLayer('enemigos')
    this.i=0;
    
    for (let step = 0; step < enemigos.objects.length; step++){
      const {x = 0, y = 0, width1 = 0} = enemigos.objects[step]
          this.enemy = this.matter.add.sprite((x) + (width1),y, Tipo)
          .setScale('0.5')  
          .setFixedRotation()
          let e;
          this.obstacles.add('enemy', this.enemy.body)
          //marcar un switch que permita crear el tipo de enemigo
          switch(Tipo){
            case 'alien':
              e = new enemyController(this,this.enemy,Tipo) ;
              break;
            case 'alien1':
              e = new EnemyController1(this,this.enemy,Tipo) ;
              break;
            case 'alien2':
              e = new EnemyController2(this,this.enemy,Tipo) ;
              break;
            case 'alien3':
              e = new EnemyController3(this,this.enemy,Tipo) ;
              break;
          }
         
          this.arrayEnemies[step]=e;
          this.i++;       
    }
    

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
  jugando(){
    if(this.playerController.vivo()){

    }
  }

 
  
}