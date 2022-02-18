
export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload() {
		this.load.image('ui-heart-empty', 'assets/sprites/ui_heart_empty.png')
		this.load.image('ui-heart-full', 'assets/sprites/ui_heart_full.png')
	}

	create() {
		this.scene.start('level')
	}
}