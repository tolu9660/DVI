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
      corazon.setScale('0.4','0.4')
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
    image.setScale('0.4','0.4')
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

}