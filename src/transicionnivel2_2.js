export default class Transicionnivel2_2 extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'transicionnivel2_2' });
    }
  
    preload(){
      this.load.image('Transicionnivel2_2',"assets/sprites/transicionNivel2C2.jpg");
    }
    /**
     * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
     */
    create() {
  
      const backgroundImage=this.add.image(0,0,'Transicionnivel2_2').setOrigin(0,0);
      // Añadimos el listener para cuando se haya pulsado una tecla. Es probable que no
      // lleguemos a ver el mensaje porque veníamos con una tecla pulsada del juego (al 
      // ir moviendo al jugador). Se puede mejorar añadiendo un temporizador que 
      // añada este listener pasado un segundo
      this.input.keyboard.on('keydown', function (event) { 
        this.scene.start('level3')
      }, this);
  
    }
  
  }