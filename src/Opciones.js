export default class Opciones extends Phaser.Scene{


    constructor() {
        super({ key: 'opciones' });
      }
      preload() {
        this.load.image('box', 'assets/sprites/grey_box.png')
        this.load.image('checkedbox','assets/sprites/blue_boxCheckmark.png')
        this.load.image('azul', 'assets/sprites/azul.jpg')
        this.load.image('flechas', 'assets/sprites/flechas.png')
        this.load.image('aswd', 'assets/sprites/aswd.png')
        this.load.image('fondo','assets/sprites/fondoopciones.jpg')
      }
      create()
      {
        this.scene.bringToTop()
        const { width, height } = this.scale
         // this.add.image(200,200,'azul');
         const backgroundImage=this.add.image(0,0,'fondo').setOrigin(0,0);
          //botones musica
          this.text = this.add.text (300,100,'Opciones',{fontSize:30});
          this.musicaButton= this.add.image(200,200,'checkedbox')
          this.musicaTexto = this.add.text(250, 190, 'Musicas Activada', { fontSize: 24 });

          this.sonidoButton = this.add.image(200, 300, 'checkedbox');
          this.sonidoTexto = this.add.text(250, 290, 'Sonido Activado', { fontSize: 24 });

          this.musicaButton.setInteractive();
          this.sonidoButton.setInteractive();

          //botones controles
          this.text = this.add.text (600,100,'Controles',{fontSize:30});
     

          //Añado los dos botones al menú
          this.botonFlechas = this.add.image(700, 200, 'flechas'); //over, out, pressed
        
  
          this.botonAswd = this.add.image(700, 350, 'aswd'); //over, out, pressed
         
          //falta la asignacion de teclas y desactivar el sonido 


          const menuinicialButton= this.add.image(width * 0.5, height * 0.9, 'azul')
          .setDisplaySize(150, 50)
          .setInteractive()
          .on('pointerdown', () => this.scene.start('inicio') );
          this.menuinicialButton = this.add.text(menuinicialButton.x, menuinicialButton.y, 'Menu')
      .setOrigin(0.5);

      }
      
  
}
    
   
    
     
