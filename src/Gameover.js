/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class Gameover extends Phaser.Scene {
  /**
   * Constructor de la escena
   */


  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */


   constructor() {
    super({ key: 'gameover' });
  }
  preload() {
   
    this.load.image('azul', 'assets/sprites/azul.jpg')
    this.load.image('gameover',"assets/sprites/gameover.jpg");
  }
  create()
  { const { width, height } = this.scale
     // this.add.image(200,200,'azul');

     const backgroundImage=this.add.image(0,0,'gameover').setOrigin(0,0);

     
      //falta la asignacion de teclas y desactivar el sonido 
      const menuinicialButton= this.add.image(width * 0.5, height * 0.9, 'azul')
      .setDisplaySize(150, 50)
      .setInteractive()
      .on('pointerdown', () => this.scene.start('inicio') );
      this.menuinicialButton = this.add.text(menuinicialButton.x, menuinicialButton.y, 'Menu')
  .setOrigin(0.5);
  
  }
}/*
  create() {
    this.add.text(500, 250, 'Se acabó!\nPulsa cualquier tecla para volver a jugar', { fontSize: '24px',})
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center');  // Centramos el texto dentro del cuadro de texto

    const backgroundImage=this.add.image(0,0,'Fondo').setOrigin(0,0);
    // Añadimos el listener para cuando se haya pulsado una tecla. Es probable que no
    // lleguemos a ver el mensaje porque veníamos con una tecla pulsada del juego (al 
    // ir moviendo al jugador). Se puede mejorar añadiendo un temporizador que 
    // añada este listener pasado un segundo
    this.input.keyboard.on('keydown', function (event) { 
      this.scene.start('boot')
    }, this);

  }*/

//}