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
  }

  create(){
      this.hearts = this.add.group({
          classType: Phaser.GameObjects.Image
      })

      this.hearts.createMultiple({
          key: 'ui-heart-full',
          setXY: {
              x: 10,
              y: 10,
              stepX: 16
          },
          quantity: 6
      })
      const image = this.add.image(20, 25, 'ui-heart-full')
     this.starsLabel = this.add.text(40 , 20, 'x0', {
        fontSize: '16px'
      })

    events.on('star-collected', this.handleStarCollected, this)
    events.on('key-collected', this.handleKeyCollected, this)
    events.on('heart-collected', this.handleHeartCollected, this)
    events.on('minus-health', this.handleMinusHealthCollected, this)
    // this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
    //   events.off('star-collected', this.handleStarCollected, this)
    // })
  }

  handleStarCollected(){
    ++this.starsCollected
    this.starsLabel.text = `x ${this.starsCollected}`
  }

  handleKeyCollected(){
    console.log('pedo')
    const image = this.add.image(30, 60, 'key')
    image.setScale('0.4','0.4')
  }

  handleHeartCollected(){
    console.log('hearts collected')
    // this.hearts.add('ui-heart-full')
    var hearts = Phaser.Utils.Array.GetAll(this.hearts.getChildren());
    var heart = Phaser.Utils.Array.GetFirst(hearts.reverse());
    this.hearts.add('ui-heart-full', true)
  }

  handleMinusHealthCollected(){
    console.log('hearts - collected')
    // this.hearts.add('ui-heart-full')
    
    var hearts = Phaser.Utils.Array.GetAll(this.hearts.getChildren());
    var heart = Phaser.Utils.Array.GetFirst(hearts.reverse());
    heart.destroy();
  }

}