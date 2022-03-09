/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
 export default class parallaxScene extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'parallax-scene' });
    }
  
    /**
     * Carga de los assets del juego
     */
    preload() {
      // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
      this.load.setPath('assets/backgrounds');
        this.load.image('background', 'level1/Night-Background8.png')
        this.load.image('ground', 'level1/Night-Background3.png')
        this.load.image('stars', 'level1/Night-Background6.png')
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
      }
  
    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {
      
        const width = this.scale.width;
        const height = this.scale.height

        this.add.image( width * 0.5, height * 0.5, 'background')
        this.add.image(0, height, 'ground')
            .setOrigin(0,1)

            this.add.image(0, height, 'stars')
            .setOrigin(0,1)


        this.cameras.main.setBounds(0,0, 2048, height)
      
    }

    update(){
        const cam = this.cameras.main
        if (this.cursors.left.isDown){
            cam.scrollX = -3
        }
        else if (this.cursors.right.isDown) {
            cam.scrollX = 3
        }
    }
  }