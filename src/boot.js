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
    

 

    //cargamos el alien
    this.load.atlas('alien','alien.png', 'alien.json');
    this.load.atlas('enemigo','enemigo.png', 'enemigo.json');
    this.load.atlas('hero','hero.png', 'hero.json');
    this.load.atlas('corazon','corazon.png', 'corazon.json');
    this.load.atlas('llave','llave.png', 'llave.json');
    this.load.atlas('energia','e.png', 'e.json');
    this.load.atlas('pm','pm.png', 'pm.json');
    this.load.atlas('texturas','/tilemaps/texturas.png', '/tilemaps/texturas.json');
    this.load.image('Fondo',"/tilemaps/Fondo.png");
    this.load.image('acido',"/tilemaps/acido.png");
    this.load.atlas('cueva','/tilemaps/cueva.png', '/tilemaps/cueva.json');
    //SUELOS NIVEL 1 (imagenes del suelo)
    this.load.image('suelo',"/tilemaps/suelo.png");  
    this.load.image('subsuelo',"/tilemaps/subsuelo.png");
    

    //MAPA NIVEL 1 (nombre recusro cache, fichero json)
    this.load.tilemapTiledJSON('level1', '/tilemaps/level1.json');

    
    this.load.image('ui-heart-empty',"/ui_heart_empty.png");
    this.load.image('ui-heart-full',"/ui_heart_full.png");
    
  
    //carga de sonidos:
    this.load.audio('sonidoFondo', '/sound/musica.mp3');


  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    
    this.scene.start('level3');
    
  }
}