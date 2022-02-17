

export default class piedra extends Phaser.GameObjects.Sprite{
    /**
     * @param {Phaser.Scene} Scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */

    constructor(scene, player, baseGroup, x, y){
        super(scene, x, y, 'piedra');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.scene.physics.add.collider(this, player); //comentario
    }

}
