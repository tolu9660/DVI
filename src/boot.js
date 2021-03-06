/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });

  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');

    
    //characters:
     this.load.atlas('hero','/PCharacters/hero.png', '/PCharacters/hero.json');
     this.load.image('bala','/PCharacters/bala.png')
     this.load.image('bala_potenciada','/PCharacters/bala_potenciada.png')
   
    //Objetos: 
    this.load.atlas('corazon','/objetos/corazon.png', '/objetos/corazon.json');
    this.load.atlas('llave','/objetos/llave.png', '/objetos/llave.json');
    this.load.atlas('energia','/objetos/eAzul.png', '/objetos/eAzul.json');
    this.load.atlas('energiaRosa','/objetos/eRosa.png', '/objetos/eRosa.json');
    this.load.atlas('pm','/objetos/pm.png', '/objetos/pm.json');
    this.load.atlas('pinchos','/objetos/pinchos.png', '/objetos/pinchos.json');
    this.load.atlas('acido','/objetos/acido.png', '/objetos/acido.json');
    this.load.atlas('lava','/objetos/lava.png', '/objetos/lava.json');
    this.load.atlas('arbusto','/objetos/arbusto.png', '/objetos/arbusto.json');
    this.load.atlas('cofre','/objetos/cofre.png', '/objetos/cofre.json');
    this.load.atlas('cuevaA','/objetos/cuevaA.png', '/objetos/cuevaA.json');
    this.load.atlas('cuevaR','/objetos/cuevaR.png', '/objetos/cuevaR.json');
    this.load.atlas('cuevaM','/objetos/cuevaM.png', '/objetos/cuevaM.json');
    //Tutorial:
    this.load.tilemapTiledJSON('tutorial', '/tilemaps/tutorial/tutorial.json');
    this.load.image('fondo','/tilemaps/tutorial/fondo.jpg');
    this.load.atlas('tiles','/tilemaps/tutorial/texture.png', '/tilemaps/tutorial/texture.json');  

    
    // NIVEL 1:
    
    this.load.tilemapTiledJSON('level1', '/tilemaps/mapa1/nivel1.json');
    this.load.image('fondo1','/tilemaps/mapa1/fondo.jpg');
    this.load.atlas('tiles1','/tilemaps/mapa1/texture.png', '/tilemaps/mapa1/texture.json'); 
    
    //carga de sonidos:
    this.load.audio('sonidoFondo', '/sound/level1/musicaEspacio.mp3');
    

    // NIVEL 2:
    this.load.tilemapTiledJSON('level2', '/tilemaps/mapa2/nivel2.json');
    this.load.image('fondo2','/tilemaps/mapa2/fondo.jpg');
    this.load.atlas('tiles2','/tilemaps/mapa2/texture.png', '/tilemaps/mapa2/texture.json'); 
    // NIVEL 3:
    this.load.tilemapTiledJSON('level3', '/tilemaps/mapa3/nivel3.json');
    this.load.image('fondo3','/tilemaps/mapa3/fondo.jpg');
    this.load.atlas('tiles3','/tilemaps/mapa3/texture.png', '/tilemaps/mapa3/texture.json'); 
    
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {    
    this.scene.start('transicion_0');
    this.MusicaFondo= this.sound.add('sonidoFondo');
    this.MusicaFondo.play();
  }
}