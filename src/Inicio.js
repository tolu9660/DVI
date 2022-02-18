export default class inicio extends Phaser.Scene {

  constructor() {
    super('inicio')
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }


  preload() {
    this.load.image('azul', 'assets/sprites/azul.jpg')


  }

  create() {
    const { width, height } = this.scale

    // Play button
    const jugarButton = this.add.image(width * 0.5, height * 0.6, 'azul')
      .setDisplaySize(150, 50)
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverStateJugar())
      .on('pointerout', () => this.enterButtonRestStateJugar())
      .on('pointerdown', () => this.scene.start('boot') )

    this.jugarButton = this.add.text(jugarButton.x, jugarButton.y, 'Jugar',)
      .setOrigin(0.5);


    // Settings button
    const opcionesButton = this.add.image(jugarButton.x, jugarButton.y + jugarButton.displayHeight + 10, 'azul')
      .setDisplaySize(150, 50)
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverStateOpciones())
      .on('pointerout', () => this.enterButtonRestStateOpciones())
      .on('pointerdown', () => this.scene.start('opciones') );


    this.opcionesButton = this.add.text(opcionesButton.x, opcionesButton.y, 'Opciones')
      .setOrigin(0.5);

    // Credits button
    const creditosButton = this.add.image(opcionesButton.x, opcionesButton.y + opcionesButton.displayHeight + 10, 'azul')
      .setDisplaySize(150, 50)
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverStateCreditos())
      .on('pointerout', () => this.enterButtonRestStateCreditos())
      .on('pointerdown', () => this.scene.start('Creditos') )
    ;

    this.creditosButton = this.add.text(creditosButton.x, creditosButton.y, 'Creditos').setOrigin(0.5);


  }


  update() {

  }
  enterButtonHoverStateOpciones() {
    this.opcionesButton.setStyle({ fill: '#ff0' });
  }

  enterButtonHoverStateJugar() {
    this.jugarButton.setStyle({ fill: '#ff0' });
  };
  enterButtonHoverStateCreditos() {
    this.creditosButton.setStyle({ fill: '#ff0' });
  }
  enterButtonRestStateJugar() {
    this.jugarButton.setStyle({ fill: '#ffff' });
  };
  enterButtonRestStateOpciones() {
    this.opcionesButton.setStyle({ fill: '#ffff' });
  }
  enterButtonRestStateCreditos() {
    this.creditosButton.setStyle({ fill: '#ffff' });
  }
}