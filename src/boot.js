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
    this.load.atlas('alien','/enemy1/alien.png', '/enemy1/alien.json');
    this.load.atlas('alien1','/enemy2/enemigo.png', '/enemy2/enemigo.json');
    this.load.atlas('alien2','/enemy3/enemigo3.png', '/enemy3/enemigo3.json');
    this.load.atlas('alien3','/enemy4/enemigo4.png', '/enemy4/enemigo4.json');
    this.load.atlas('hero','/PCharacters/hero.png', '/PCharacters/hero.json');
   
    //Objetos: 
    this.load.atlas('corazon','/objetos/corazon.png', '/objetos/corazon.json');
    this.load.atlas('llave','/objetos/llave.png', '/objetos/llave.json');
    this.load.atlas('energia','/objetos/e.png', '/objetos/e.json');
    this.load.atlas('pm','/objetos/pm.png', '/objetos/pm.json');
    this.load.image('ui-heart-empty',"/objetos/ui_heart_empty.png");
    this.load.image('ui-heart-full',"/objetos/ui_heart_full.png");

    //transicion inicial
    
    this.load.image('Transicion0',"/trasInicioC0.jpg");
    this.load.image('Transicion1',"/trasInicioC1.jpg");
    
  
    
    
    // NIVEL 1:
    
    this.load.tilemapTiledJSON('level1', '/tilemaps/mapa1/level1.json');
    this.load.atlas('texturas','/tilemaps/mapa1/texturas.png', '/tilemaps/mapa3/texturas.json');
    this.load.image('Fondo',"/tilemaps/mapa1/Fondo.png");
    this.load.image('acido',"/tilemaps/mapa1/acido.png");
    this.load.atlas('cueva','/tilemaps/mapa1/cueva.png', '/tilemaps/mapa3/cueva.json');
    //carga de sonidos:
    this.load.audio('sonidoFondo', '/sound/level1/musica.mp3');

    // NIVEL 2:
    



  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    
    this.scene.start('transicion');
    
  }
}