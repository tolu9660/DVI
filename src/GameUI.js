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
    this.scene.bringToTop()
    
    const corazon = this.add.image(30, 20, 'corazon','Heart1.png')
    this.heartLabel = this.add.text(45, 25, 'x6', {
      fontSize: '16px'
    })
    corazon.scale=0.4
      const energia = this.add.image(100, 25, 'energia','Blue Crystal2.png')
      energia.scale=0.4
     this.starsLabel = this.add.text(123 , 26, 'x0', {
        fontSize: '16px'
      })
      const energiaPlus = this.add.image(170, 25, 'energiaRosa','Red Crystal2.png')
      energiaPlus.scale=0.4
     this.starsLabelPlus = this.add.text(195 , 26, 'x0', {
        fontSize: '16px'
      })

    events.on('energy', this.handleEnergy, this)
    events.on('energyPlus', this.handleEnergyPlus, this)
    // events.on('energy-used', this.handleEnergyUsed, this)
    events.on('key-collected', this.handleKeyCollected, this)
    events.on('heart', this.handleHeart, this)
    //eventos que gestionan el decremento de vida.
    events.on('minus-health', this.handleMinusHealthCollected, this)
    events.on('minus-health2', this.handleMinusHealthCollected2, this)
    events.on('cueva-in', this.handleCuevaIn, this)
    events.on('cueva-stop', this.handleCuevaStop, this)
    events.on('mensaje-ayuda-energia', this.handleMensajeAyudaEnergia, this)
    events.on('mensaje-ayuda-llave', this.handleMensajeAyudaLlave, this)
    events.on('mensaje-ayuda-corazon', this.handleMensajeAyudaCorazon, this)
    
    // events.on('mensaje-ayuda', this.handleMensajeAyudaEnergia, this)
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('energy', this.handleEnergy, this)
    })
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('energyPlus', this.handleEnergyPlus, this)
    })
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('key-collected', this.handleKeyCollected, this)
    })
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('heart', this.handleHeartCollected, this)
    })
    //creo un evento por cada enemigo
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('minus-health', this.handleMinusHealthCollected, this)
    })
    this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
      events.off('minus-health2', this.handleMinusHealthCollected2, this)
    })
  }

  handleEnergy(value){
    this.starsLabel.text = `x${value}`
  }
  handleEnergyPlus(value){
    this.starsLabelPlus.text = `x${value}`
  }
  handleEnergyCollected(value){
    this.starsLabel.text = `x${value}`
  }

  handleKeyCollected(){
    const image = this.add.image(250, 23, 'llave')
    image.scale=0.4

  }

  handleHeart(value){
    this.heartLabel.text = `x${value}`
  }

  handleMinusHealthCollected(){

    --this.heartsCollected
    if (this.heartsCollected == 0){
      this.scene.pause('level')
    
      this.scene.start('end')
    }
    this.heartLabel.text = `x${this.heartsCollected}`

  }
  handleMinusHealthCollected2(){

   this.heartsCollected=this.heartsCollected-2
    if (this.heartsCollected == 0){
      this.scene.pause('level')
    
      this.scene.start('end')
    }
    this.heartLabel.text = `x${this.heartsCollected}`

  }

  handleCuevaIn(level,next){
    this.scene.stop(level)
    this.scene.start(next)
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

  handleMensajeAyudaEnergia(nivel){
    if (!this.messageEnergia && nivel == 'tutorial') {
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
  handleMensajeAyudaLlave(nivel){
    if (!this.messageLlave && nivel == 'tutorial') {
      let bubble;
      let content = [
        "Esta llave te permitir?? acceder a la cueva para liberar a un miembro de la familia.",
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
  handleMensajeAyudaCorazon(nivel){    

    if (!this.messageCorazon && nivel == 'tutorial') {
      let bubble;
      let content = [
        "Estos corazones te ayudar??n a recuperar la vida perdida. Recuerda que solo dispones de 6 vidas",
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

    var content = this.add.text(0, 0, quote, { fontFamily: 'monospace', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

    var b = content.getBounds();

    //posicionar segun el personaje
     content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
     return [content, bubble];
}

}