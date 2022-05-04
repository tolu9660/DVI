//import Platform from './platform.js';
//import Player from './player.js';
////import piedra from './piedra.js';
import PlayerController from './PlayerController.js'
import enemyController from './EnemyController1.js'
import corazon from './corazon.js';
import ObstaclesController from './ObstaclesController.js';
import energia from './energia.js';
import PlataformaMovil from './plataformaVertical.js';
import llave from './llave.js';
import cueva from './cuevaRoja.js'
import LevelClass from './LevelClass.js';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Tutorial extends LevelClass {

  /**
   * Constructor de la escena perro
   */
  constructor() {
    super('tutorial');
    this.arrayTileset=[];
  }

 

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create(){
    let a =0;
    this.arrayTileset[0] = 'fondo';
    this.arrayTileset[1] = 'tiles';
    //this.arrayTileset[2] = 'sueloT';
    super.create('tutorial',this.arrayTileset);
    //indico para cada capa que tilesets voy a utilizar
    let ground=['fondo',[0]];
    let plataformas=['plataformas',[1]];
    let Capas=[ground,plataformas];
    super.creacionCapas(Capas);
    super.cargaEnemigos();
    this.MusicaFondo= this.sound.add('sonidoFondo');
    this.MusicaFondo.play();

  }

  update(t, dt){
    let a =0;
    super.update(t,dt);
    
  }


 
  
}