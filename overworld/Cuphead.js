import { walkLogic, createAnimations } from './cupheadFunc.js'
export default class Cuphead extends Phaser.Physics.Matter.Sprite {
    static preload(scene) {
        scene.load.spritesheet('cuphead', 'overworld/sprites/cuphead.png', {
            frameWidth: 24,
            frameHeight: 26
        })
    }
    constructor(scene, x, y, texture, frame) {
        super(scene.matter.world, x, y, texture, frame, {
            shape: {
                type: 'circle',
                radius: 5
            }
        })
        this.scene.add.existing(this)

        this.setOrigin(0.5, 0.7)
        this.direction = 'down'
        this.speed = 1
        this.setFixedRotation()
        createAnimations(this)
    }
    update() {
        walkLogic(this)
    }
}
