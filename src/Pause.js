export default class Pause extends Phaser.Scene{


    constructor() {
        super({ key: 'pause' });
      }
      init() {
        this.cursors = this.input.keyboard.createCursorKeys()
      }
    
    
      preload() {
        this.load.image('azul', 'assets/sprites/azul.jpg')
        this.load.image('Inicio',"assets/sprites/inicio.jpg");
    
    
      }
    
      create() {
        this.scene.bringToTop()
        const backgroundImage=this.add.image(0,0,'Inicio').setOrigin(0,0);
    
        const { width, height } = this.scale
    
        // Reanudar button
        const reanudarButton = this.add.image(width * 0.5, height * 0.45, 'azul')
          .setDisplaySize(150, 50)
          .setInteractive()
          .on('pointerover', () => this.enterButtonHoverStateReanudar())
          .on('pointerout', () => this.enterButtonRestStateReanudar())
          .on('pointerdown', () => this.scene.start('boot') )
    
        this.reanudarButton = this.add.text(reanudarButton.x, reanudarButton.y , 'Reiniciar',)
          .setOrigin(0.5);
    
    
        // Settings button
        const opcionesButton = this.add.image(reanudarButton.x, reanudarButton.y + reanudarButton.displayHeight + 18, 'azul')
          .setDisplaySize(150, 50)
          .setInteractive()
          .on('pointerover', () => this.enterButtonHoverStateOpciones())
          .on('pointerout', () => this.enterButtonRestStateOpciones())
          .on('pointerdown', () => this.scene.start('opciones') );
    
    
        this.opcionesButton = this.add.text(opcionesButton.x, opcionesButton.y, 'Opciones')
          .setOrigin(0.5);
    
        // Reiniciar button
        const reiniciarButton = this.add.image(opcionesButton.x, opcionesButton.y + opcionesButton.displayHeight + 18, 'azul')
          .setDisplaySize(150, 50)
          .setInteractive()
          .on('pointerover', () => this.enterButtonHoverStateReiniciar())
          .on('pointerout', () => this.enterButtonRestStateReiniciar())
          .on('pointerdown', () => this.scene.start(this.scene.start(this.scene.key)) )
        ;
    
        this.reiniciarButton = this.add.text(reiniciarButton.x, reiniciarButton.y, 'Reanudar').setOrigin(0.5);
    
        const SalirButton = this.add.image(reiniciarButton.x, reiniciarButton.y + reiniciarButton.displayHeight + 18, 'azul')
        .setDisplaySize(150, 50)
        .setInteractive()
          .on('pointerover', () => this.enterButtonHoverStateSalir())
          .on('pointerout', () => this.enterButtonRestStateSalir())
        .on('pointerdown', () => this.scene.start('inicio') )
        this.SalirButton = this.add.text(SalirButton.x, SalirButton.y, 'Salir').setOrigin(0.5);
  
    }
    
    
      update() {
    
      }
      enterButtonHoverStateOpciones() {
        this.opcionesButton.setStyle({ fill: '#ff0' });
      }
    
      enterButtonHoverStateReanudar() {
        this.reanudarButton.setStyle({ fill: '#ff0' });
      };
      enterButtonHoverStateReiniciar() {
        this.reiniciarButton.setStyle({ fill: '#ff0' });
      }
      enterButtonRestStateReiniciar() {
        this.reiniciarButton.setStyle({ fill: '#ffff' });
      };
      enterButtonRestStateReanudar() {
        this.reanudarButton.setStyle({ fill: '#ffff' });
      };
      enterButtonRestStateOpciones() {
        this.opcionesButton.setStyle({ fill: '#ffff' });
      }
      enterButtonRestStateReanudar() {
        this.reiniciarButton.setStyle({ fill: '#ffff' });
      }
      enterButtonRestStateSalir() {
        this.SalirButton.setStyle({ fill: '#ffff' });
      }
      enterButtonHoverStateSalir() {
        this.SalirButton.setStyle({ fill: '#ff0' });
      }
    }