
import LevelClass from './LevelClass.js';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level2 extends LevelClass {

  /**
   * Constructor de la escena perro
   */
  constructor() {
    super('level2');
    this.arrayTileset=[];
  }

  preload(){
    this.load.setPath('assets/sprites/enemies');
    this.load.atlas('drago','/drago.png', '/drago.json');
    this.load.atlas('ralph','/ralph.png', '/ralph.json');
    this.load.atlas('bozapatilla','/bozapatilla.png', '/bozapatilla.json');
    this.load.atlas('anatort','/anatort.png', '/anatort.json');
    this.load.image('ralph_bala','/ralph_bala.png');
    this.load.image('bozapatilla_bala','/bozapatilla_bala.png');
    

  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create(){
    let a =0;
    this.arrayTileset[0] = 'fondo2';
    this.arrayTileset[1] = 'tiles2';
    //this.arrayTileset[2] = 'sueloT';
    super.create('level2',this.arrayTileset);
    //indico para cada capa que tilesets voy a utilizar
    let ground=['fondo',[0]];
    let plataformas=['plataformas',[1]];
    let Capas=[ground,plataformas];
    super.creacionCapas(Capas);
    super.cargaEnemigos();   
  }

  update(t, dt){
    let a =0;
    super.update();
    
  }


 
  
}