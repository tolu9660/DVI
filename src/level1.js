import LevelClass from './LevelClass.js';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level1 extends LevelClass {

  /**
   * Constructor de la escena perro
   */
  constructor() {
    super('level1');
    this.arrayTileset=[];
    
  }

 

  preload(){
    this.load.setPath('assets/sprites/enemies');
    this.load.atlas('shangheili','/shangheili.png', '/shangheili.json');
    this.load.atlas('grunt','/grunt.png', '/grunt.json');
    this.load.atlas('sapien','/sapien.png', '/sapien.json');
    this.load.atlas('anatort','/anatort.png', '/anatort.json');
    //this.load.atlas('bozapatilla','/bozapatilla.png', '/bozapatilla.json');
    this.load.image('grunt_bala','/grunt_bala.png');

    this.load.image('bozapatilla_bala','/bozapatilla_bala.png');
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create(){
    
    let a =0;
    this.arrayTileset[0] = 'fondo1';
    this.arrayTileset[1] = 'tiles1';
    super.create('level1',this.arrayTileset);
    let ground=['fondo',[0]];
    let plataformas=['plataformas',[1]];
    let Capas=[ground,plataformas];
    super.creacionCapas(Capas);
    super.cargaEnemigos();
   
  }

  update(t, dt){
    let a =0;
    super.update(t, dt);
    
    
  }


 
  
}