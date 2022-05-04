
import PlayerController from './PlayerController.js'
import EnemyController from './EnemyController.js'

import corazon from './corazon.js';
import ObstaclesController from './ObstaclesController.js';
import energia from './energia.js';
import PlataformaMovil from './plataformaVertical.js';
import llave from './llave.js';
import cueva from './cuevaRoja.js'
import EnemyController1 from './EnemyController1.js';
import EnemyController2 from './EnemyController2.js';
import EnemyController3 from './EnemyController3.js';
import cuevaRoja from './cuevaRoja.js';
import cuevaAzul from './cuevaAzul.js';
import { sceneEvents as events } from './EventsCenter.js';
import PlataformaVertical from './plataformaVertical.js';
import PlataformaHorizontal from './PlataformaHorizontal.js';
import PlataformaTiempo from './plataformaTiempo.js';
import cofre from './cofre.js';
import energiaRosa from './energiaRosa.js';

/**hola esto es una prueba* */

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
  create(KeyLevel,Tilesets ) {
    
    this.scene.launch('game-ui');
    this.map = this.make.tilemap({ key: KeyLevel });

    //const backgroundImage=this.add.image(0,0,BackG).setOrigin(0,0);
    let conjuntos=['fondo','plataformas'];
    //creo los diferentes tileset que voy a usar para mi nivel
    for(let i=0; i<Tilesets.length; i++){
      this.ArrayTileset[i]=this.map.addTilesetImage(conjuntos[i],Tilesets[i]);//KEY -> nombre del boot
    }
    this.enemies = this.add.group();
    this.objects = this.add.group();
  
  }
  creacionCapas(Capas){
    let c=[];
      for(let e=0; e<Capas.length;e++){

        for(let i=0; i<Capas[e][1].length; i++){
          c[i]=this.ArrayTileset[Capas[e][1]];
        }
      if(Capas[e][0]=='fondo'){
        this.groundLayer = this.map.createLayer(Capas[e][0],c);
    
      }
      if(Capas[e][0]=='plataformas'){
        this.groundLayer = this.map.createLayer(Capas[e][0],c); 
   
        }   
    }
    
    this.groundLayer.setCollisionByProperty({collides : true});    
    // this.physics.world.setBounds(0,0,16000,3000);
    this.cargarObjetos();

    
  }
  cargarObjetos(){
  const objectsLayer = this.map.getObjectLayer('objects')
  objectsLayer.objects.forEach(objData => {
    const {x = 0, y = 0, name, width = 0, height = 0} = objData
      switch (name) {
        case 'heroe': { 
          this.playerController = new PlayerController(this,x,y)
          this.physics.add.collider(this.playerController ,this.groundLayer)
          break;
        }

        case 'cueva':{
      
           //cambiar plataformaMovil por la clase
           switch ( objData.type) {
            case 'Rojo': { 
              
              this.objects.add(new cuevaRoja(this,x,y))
             
            break;
            }
            case 'Metal': { 
              this.objects.add(new cuevaAzul(this,x,y))
            break;
            }
            default:{
              this.objects.add(new cuevaAzul(this,x,y))
              break; 
            }
          }
         break;
        }

        case 'corazon':{
          this.objects.add(new corazon(this,x, y))
        break;
        }
        case 'cofre':{
          this.objects.add(new cofre(this,x, y))
        break;
        }
        case 'pm':{
          //this.plataforma = this.physics.add.staticSprite(x + (width),y, objData.type)
        
         // this.physics.add.collider(this.plataforma,this.groundLayer)

         //cambiar plataformaMovil por la clase
          switch ( objData.type) {
            case 'pmv': { 
              /*this.plataforma = this.physics.add.staticSprite(x, y , 'pm');
              this.plataforma.body.ignoreGravity = true;
              
              this.posicion_plataforma_x = this.plataforma.x
              this.posicion_plataforma_y = this.plataforma.y
              console.log( this.plataforma.body)*/
              this.objects.add(new PlataformaVertical(this,x,y))
             
            break;
            }
            case 'pmh': { 
              this.objects.add(new PlataformaHorizontal(this,x,y))
            break;
            }
            /*case 'pmt': { 

              this.objects.add(new PlataformaTiempo(this,x,y))
            break;
            }*/
            default:{
              this.objects.add(new PlataformaHorizontal(this,x,y))
              break; 
            }
          }
         break;
        }
        case 'trampa':{
          this.pm = this.physics.add.staticSprite(x + (width),y, objData.type)
          .setScale('1')  
          this.physics.add.collider(this.pm,this.groundLayer)

          // .setFixedRotation();
          //cambiar plataformaMovil por la clase
          switch ( objData.type) {
            case 'acido': { 
              this.aux = new PlataformaMovil(this,this.pm)
            break;
            }
            case 'lava': { 
              this.aux = new PlataformaMovil(this,this.pm)
            break;
            }
            case 'pinchos': { 
              this.aux = new PlataformaMovil(this,this.pm)
            break;
            }
            default:{
              this.aux = new PlataformaMovil(this,this.pm)
              break; 
            }
          }
         
          this.arrayObjects[this.j]=this.aux;
          this.j++;
          break;
        }
        case 'energia':{
          

          if(objData.type==='Rosa'){
            this.objects.add(new energiaRosa(this,x, y))
          }
          else{
            this.objects.add(new energia(this,x, y))
          }

      
        break;
        }

        case 'llave': {
          this.objects.add(new llave(this,x, y))
          // this.k = this.physics.add.staticSprite(x + (width),y, 'llave')
          // .setScale('1.5')  
          // // .setFixedRotation();
          // this.physics.add.collider(this.k,this.groundLayer)

          // this.k.setData('type', 'llave')
          // this.c = new llave(this,this.k)
          // this.arrayObjects[this.j]=this.c;

          // this.j++;

          break;
        }


      }
    })
  }
  cargaEnemigos(){
    const enemigos = this.map.getObjectLayer('enemigos')
    this.i=0;
    let type;
    for (let step = 0; step < enemigos.objects.length; step++){
      type= enemigos.objects[step].type;
      const {x = 0, y = 0, width1 = 0} = enemigos.objects[step]
          // this.enemy = this.physics.add.sprite((x) + (width1),y, Tipo)  
          // this.physics.add.collider(this.enemy,this.groundLayer)
          // .setFixedRotation()
          // let e;

          // this.obstacles.add('enemy', this.enemy.body)
          //marcar un switch que permita crear el tipo de enemigo
          console.log(type);
          switch(type){
            case 'alien':
              this.enemies.add(new EnemyController(this,x, y,type)) ;
              break;
            case 'alien1':
              this.enemies.add(new EnemyController1(this,x,y,type)) ;
              break;
            // case 'alien2':
            //   e = new EnemyController2(this,this.enemy,Tipo) ;
            //   break;
            // case 'alien3':
            //   e = new EnemyController3(this,this.enemy,Tipo) ;
            //   break;
            default:
              console.log("no se ha captado el tipo del enemigo");
              this.enemies.add(new EnemyController(this,x, y,'alien'));
          }
          // this.arrayEnemies[step]=e;
          this.i++;       
    }
    
   
  }

  update(t, dt){
    if (!this.playerController) {
      return
    }    
    this.playerController.update(dt);
    if (this.objects.getChildren()) {
      this.objects.getChildren().forEach((element) => {
        element.actu(dt)
      });
      
    }

    
    
    if (this.enemies.getChildren()) {
      this.enemies.getChildren().forEach((element) => {
        element.update(dt)
      });
      
    }

    
  }
 

 
  
}