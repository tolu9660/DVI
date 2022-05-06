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

 
  preload(){
    this.load.setPath('assets/sprites/');
        //Tutorial:
        this.load.tilemapTiledJSON('tutorial', '/tilemaps/tutorial/tutorial.json');
        this.load.image('fondo','/tilemaps/tutorial/fondo.jpg');
        this.load.atlas('tiles','/tilemaps/tutorial/texture.png', '/tilemaps/tutorial/texture.json');  
    this.load.setPath('assets/sprites/enemies');
    this.load.atlas('jackal','/jackal.png', '/jackal.json');
    this.load.image('jackal_bala','/jackal_bala.png');
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
    

  }

  update(t, dt){
    let a =0;
    super.update(t,dt);
    
  }


 sinsonido()
 {
   this.MusicaFondo.pause();
 }
  
}