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
      const hearts = this.add.group({
          classType: Phaser.GameObjects.Image
      })

      hearts.createMultiple({
          key: 'ui-heart-full',
          setXY: {
              x: 10,
              y: 10,
              stepX: 16
          },
          quantity: 3
      })

     this.starsLabel = this.add.text(0,20, 'Stars: 0', {
        fontSize: '16px'
      })

    events.on('star-collected', this.handleStarCollected, this)

    // this.events.once(Phaser.Scenes.Events.DESTROY, ()=>{
    //   events.off('star-collected', this.handleStarCollected, this)
    // })
  }

  handleStarCollected(){
    ++this.starsCollected
    this.starsLabel.text = `Stars: ${this.starsCollected}`
  }


}