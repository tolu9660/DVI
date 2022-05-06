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
  preload(){
    this.load.setPath('assets/sprites/enemies');
    this.load.atlas('cocodry','/cocodry.png', '/cocodry.json');
    this.load.atlas('marinavaja','/marinavaja.png', '/marinavaja.json');
    this.load.atlas('lobeznotrid','/lobeznotrid.png', '/lobeznotrid.json');
    this.load.atlas('galrado','/galrado.png', '/galrado.json');
    this.load.image('galrado_bala','/galrado_bala.png');
    this.load.image('cocodry_bala','/cocodry_bala.png');
    this.load.image('marinavaja_bala','/marinavaja_bala.png');
    this.load.image('lobeznotrid_bala','/lobeznotrid_bala.png');
   

  }
 

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create(){
    let a =0;
    this.arrayTileset[0] = 'fondo3';
    this.arrayTileset[1] = 'tiles3';
    //this.arrayTileset[2] = 'sueloT';
    super.create('level3',this.arrayTileset);
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