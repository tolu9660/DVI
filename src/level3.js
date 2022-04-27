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
import LevelClass from './LevelClass.js';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level3 extends LevelClass {

  /**
   * Constructor de la escena perro
   */
  constructor() {
    super('level3');
    this.arrayTileset=[];
  }

 

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create(){
    let a =0;
    this.arrayTileset[0] = 'acido';
    this.arrayTileset[1] = 'texturas';
    this.arrayTileset[2] = 'sueloT';
    super.create('level1',this.arrayTileset,'Fondo');
    let ground=['ground',[0,1,2]];
    let plataformas=['plataformas',[2]];
    let Capas=[ground,plataformas];
    super.creacionCapas(Capas);

    super.cargaEnemigos('alien1');
    this.MusicaFondo= this.sound.add('sonidoFondo');
    this.MusicaFondo.play();
  }


  update(t, dt){
    let a =0;
    super.update();
    
  }


 
  
}