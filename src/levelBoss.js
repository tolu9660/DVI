
import LevelClass from './LevelClass.js';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class LevelBoss extends LevelClass {

  /**
   * Constructor de la escena perro
   */
  constructor() {
    super('levelBoss');
    this.arrayTileset=[];
    
  }

 

  preload(){
    this.load.setPath('assets/sprites/enemies');
    this.load.atlas('crawler','/crawler.png', '/crawler.json');
    // this.load.image('crawler_bala','/crawler_bala.png');
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create(){
    
    let a =0;
    this.arrayTileset[0] = 'fondoBoss';
    this.arrayTileset[1] = 'tilesBoss';
    super.create('levelBoss',this.arrayTileset);
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
    super.update(t, dt);
    
    
  }


 
  
}