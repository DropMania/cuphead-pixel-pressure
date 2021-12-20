export default class Window extends Phaser.Physics.Matter.Image {
    static preload(scene) {
        scene.load.image('window', 'window.png')
    }
    constructor(scene, x, y, texture, text, buttons) {
        super(scene.matter.world, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.setOrigin(0.5, 0.5)
        this.title = this.scene.add
            .text(x, y - 20, text, {
                fontSize: '12px',
                fill: '#fff'
            })
            .setOrigin(0.5, 0.5)

        this.buttons = []
        this.cursor = 0
        buttons.forEach((button, i) => {
            this.buttons.push(
                this.scene.add.text(
                    this.x - this.width / 2 + i * 60 + 10,
                    this.y + 20,
                    button,
                    {
                        fontSize: '12px',
                        fill: '#fff',
                        align: 'center',
                        strokeThickness: this.cursor === i ? 2 : 0,
                        stroke: '#f00'
                    }
                )
            )
        })
    }
    moveCursor(step) {
        let cursor = this.cursor + step
        if (cursor >= this.buttons.length - 1) {
            cursor = this.buttons.length - 1
        }
        if (cursor <= 0) {
            cursor = 0
        }
        this.cursor = cursor
        this.buttons.forEach((button, i) => {
            button.setStroke(i === this.cursor ? '#f00' : '#000', 2)
        })
    }
    delete() {
        this.title.destroy()
        this.buttons.forEach((button) => button.destroy())
        this.destroy()
    }
}
