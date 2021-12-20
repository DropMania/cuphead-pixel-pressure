export default class Window extends Phaser.Physics.Matter.Image {
    static preload(scene) {
        scene.load.image('window', 'window.png')
    }
    constructor(scene, x, y, texture, text, buttons) {
        super(scene.matter.world, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.setOrigin(0.5, 0.5)
        this.setScale(2)
        this.info = this.scene.add.text(x - 150, y - 120, '*Space to Select', {
            fontSize: '10px',
            align: 'center',
            fill: '#ffffff'
        })
        this.title = this.scene.add
            .text(x, y - 50, text, {
                fontSize: '24px',
                fill: '#fff',
                align: 'center'
            })
            .setOrigin(0.5, 0.5)

        this.buttons = []
        this.cursor = 0
        buttons.forEach((button, i) => {
            this.buttons.push(
                this.scene.add.text(this.x - 40, this.y + i * 30 + 5, button, {
                    fontSize: '18px',
                    fill: '#fff',
                    align: 'center',
                    strokeThickness: 2,
                    stroke: this.cursor === i ? '#f00' : '#000'
                })
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
        this.info.destroy()
        this.buttons.forEach((button) => button.destroy())
        this.destroy()
    }
}
