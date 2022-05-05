/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
 export default class Transicion extends Phaser.Scene {
    /**
     * Constructor de la escena
     */


    
    constructor() {
      super({ key: 'transicion' });
    }
  
    preload(){
      this.load.image('Transicion0',"assets/sprites/trasInicioC0.jpg");
    }
    /**
     * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
     */
    
  
       
    create() {
  
      const backgroundImage=this.add.image(0,0,'Transicion0').setOrigin(0,0);
     // const backgroundImage=this.add.image(0,0,'Transicion0').setOrigin(0,0);
      // Añadimos el listener para cuando se haya pulsado una tecla. Es probable que no
      // lleguemos a ver el mensaje porque veníamos con una tecla pulsada del juego (al 
      // ir moviendo al jugador). Se puede mejorar añadiendo un temporizador que 
      // añada este listener pasado un segundo

      this.input.keyboard.on('keydown', function (event) { 
        this.scene.start('transicion1')
      }, this);
  
    }
  
  }
  
     
