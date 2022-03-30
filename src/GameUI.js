import { sceneEvents as events} from "./EventsCenter.js";

export default class GameUI extends Phaser.Scene {


  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'game-ui' });

  }

  init(){
    this.starsCollected = 0;
    this.heartsCollected = 6;
    this.messageCueva = false
    this.messageLlave = false
    this.messageCorazon = false
    this.messageEnergia = false
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(){
      // this.hearts = this.add.group({
      //     classType: Phaser.GameObjects.Image
      // })

      // this.hearts.createMultiple({
      //     key: 'ui-heart-full',
      //     setXY: {
      //         x: 10,
      //         y: 10,
      //         stepX: 16
      //     },
      //     quantity: 6
      // })


      const corazon = this.add.image(30, 20, 'corazon')
      this.heartLabel = this.add.text(45, 25, 'x6', {
        fontSize: '16px'
      })

      const energia = this.add.image(100, 25, 'energia')
      energia.setScale('0.4','0.4')
     this.starsLabel = this.add.text(123 , 26, 'x0', {
        fontSize: '16px'
      })

    events.on('star-collected', this.handleStarCollected, this)
    events.on('key-collected', this.handleKeyCollected, this)
    events.on('heart-collected', this.handleHeartCollected, this)
    events.on('minus-health', this.handleMinusHealthCollected, this)
    events.on('cueva-in', this.handleCuevaIn, this)
    events.on('cueva-stop', this.handleCuevaStop, this)
    events.on('mensaje-ayuda-energia', this.handleMensajeAyudaEnergia, this)
    events.on('mensaje-ayuda-llave', this.handleMensajeAyudaLlave, this)
    events.on('mensaje-ayuda-corazon', this.handleMensajeAyudaCorazon, this)
    events.on('mensaje-ayuda-spikes', this.handleMensajeAyudaSpikes, this)
    
    // events.on('mensaje-ayuda', this.handleMensajeAyudaEnergia, this)
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('star-collected', this.handleStarCollected, this)
    })
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('key-collected', this.handleKeyCollected, this)
    })
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('heart-collected', this.handleHeartCollected, this)
    })
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('minus-health', this.handleMinusHealthCollected, this)
    })
  }

  handleStarCollected(){
    ++this.starsCollected
    this.starsLabel.text = `x${this.starsCollected}`
  }

  handleKeyCollected(){
    const image = this.add.image(180, 23, 'llave')

  }

  handleHeartCollected(){
    console.log('hearts collected')
    if (this.heartsCollected < 6){
      this.heartsCollected++
    }

    this.heartLabel.text = `x${this.heartsCollected}`
  }

  handleMinusHealthCollected(){
    console.log('hearts - collected')
    --this.heartsCollected
    console.log(this.heartsCollected)
    if (this.heartsCollected == 0){
      this.scene.pause('level')
      this.scene.start('end')
    }
    this.heartLabel.text = `x${this.heartsCollected}`

  }

  handleCuevaIn(){
    this.scene.pause('level')
    this.scene.start('end')
  }

  handleCuevaStop(){
    if (!this.messageCueva) {
      let bubble;
      let content = [
        "Recuerda que para acceder a la cueva debes obtener una llave.",
        " Pulsa el espacio para salir",
      ];
    
      this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 10000,
        onStart: () => {
          this.scene.pause('level2')
        // instructions = this.add.text( 200, 25, content,{font: '12px monospace', fill: '#fff', align: 'center'});
        bubble = this.createSpeechBubble(380,35, 400, 100, content);
      },
        onUpdate: () => {
          if(this.cursors.space.isDown){
            this.scene.resume('level2')
            bubble[0].destroy()
            bubble[1].destroy()
            this.messageCueva = true
          }
        },

        onComplete: () => {
          this.scene.resume('level2')
          bubble[0].destroy()
          bubble[1].destroy()
          this.messageCueva = true
        }
      })
    }
    
  }

  handleMensajeAyudaEnergia(){
    if (!this.messageEnergia) {
      let bubble;
      let content = [
        "Recopila estas celulas de energia para usar un disparo mas potente",
        " Pulsa el espacio para salir",
      ];
    
      this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 5000,
        onStart: () => {
          this.scene.pause('level2')
          bubble = this.createSpeechBubble(380,35, 400, 150, content);
        },
        onUpdate: tween => {
          if(this.cursors.space.isDown){
            this.scene.resume('level2')
            bubble[0].destroy()
            bubble[1].destroy()
            this.messageEnergia = true
          }
        },

        onComplete: () => {
          this.scene.resume('level2')
          bubble[0].destroy()
          bubble[1].destroy()
          this.messageEnergia = true
        }
      })
    }
  }
  handleMensajeAyudaLlave(){
    if (!this.messageLlave) {
      let bubble;
      let content = [
        "Esta llave te permitirá acceder a la cueva para liberar a un miembro de la familia.",
        " Pulsa el espacio para salir",
      ];
    
      this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 5000,
        onStart: () => {
          this.scene.pause('level2')
          bubble = this.createSpeechBubble(380,35, 400, 150, content);
        },
        onUpdate: tween => {
          if(this.cursors.space.isDown){
            this.scene.resume('level2')
            bubble[0].destroy()
            bubble[1].destroy()
            this.messageLlave = true
          }
        },

        onComplete: () => {
          this.scene.resume('level2')
          bubble[0].destroy()
          bubble[1].destroy()
          this.messageLlave = true
        }
      })
    }
  }
  handleMensajeAyudaCorazon(){    

    if (!this.messageCorazon) {
      let bubble;
      let content = [
        "Estos corazones te ayudarán a recuperar la vida perdida. Recuerda que solo dispones de 6 vidas",
        " Pulsa el espacio para salir",
      ];
      this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 5000,
        onStart: () => {
          this.scene.pause('level2')
          bubble = this.createSpeechBubble(380,35, 400, 150, content);
        },
        onUpdate: tween => {
          if(this.cursors.space.isDown){
            this.scene.resume('level2')
            bubble[0].destroy()
            bubble[1].destroy()
            this.messageCorazon = true
          }
        },

        onComplete: () => {
          this.scene.resume('level2')
          bubble[0].destroy()
          bubble[1].destroy()
          this.messageCorazon = true
        }
      })
    }
  }

  handleMensajeAyudaEnemigo(){    

    if (!this.messageCorazon) {
      let bubble;
      let content = [
        "Nos encontraremos enemigos con determinados ataques. Podrás acabar con ellos saltando sobre ellos o disparando si posees el arma.",
      ];
      this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 5000,
        onStart: () => {
          this.scene.pause('level2')
          bubble = this.createSpeechBubble(380,35, 400, 150, content);
        },
        onUpdate: tween => {
          if(this.cursors.space.isDown){
            this.scene.resume('level2')
            bubble[0].destroy()
            bubble[1].destroy()
            this.messageCorazon = true
          }
        },

        onComplete: () => {
          this.scene.resume('level2')
          bubble[0].destroy()
          bubble[1].destroy()
          this.messageCorazon = true
        }
      })
    }
  }

  createSpeechBubble (x, y, width, height, quote)
{
    var bubbleWidth = width;
    var bubbleHeight = height;
    var bubblePadding = 10;
    var arrowHeight = bubbleHeight / 4;

    var bubble = this.add.graphics({ x: x, y: y });

    //  Bubble color
    bubble.fillStyle(0xffffff, 0.5);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    var point1X = Math.floor(bubbleWidth / 7);
    var point1Y = bubbleHeight;
    var point2X = Math.floor((bubbleWidth / 7) * 2);
    var point2Y = bubbleHeight;
    var point3X = Math.floor(bubbleWidth / 7);
    var point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    var content = this.add.text(0, 0, quote, { fontFamily: 'monospace', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

    var b = content.getBounds();

    //posicionar segun el personaje
     content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
     return [content, bubble];
}

}