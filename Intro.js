export default class Intro extends Phaser.Scene {
    constructor(game) {
        super()
        this.game = game
        Phaser.Scene.call(this, { key: 'Intro' })
    }
    init(data) {}
    preload() {
        this.load.setBaseURL('assets/')
        for (let i = 0; i < 6; i++) {
            this.load.image(`intro_${i}`, `intro_${i}.png`)
        }
        this.load.audio('intro_music', 'intro.mp3')
    }
    create() {
        this.intro = this.add.image(0, 0, 'intro_0')
        this.intro.setOrigin(0, 0)
        this.intro.setScale(1.3)
        this.intro.setInteractive()
        this.sound.play('intro_music', {
            volume: 0.8
        })
        this.intro.on('pointerdown', () => {
            this.intro.removeAllListeners()
            this.intro.setTexture(`intro_1`)
            let idx = 2
            let evt = this.time.addEvent({
                delay: 7000,
                callback: () => {
                    if (idx === 6) {
                        this.sound.stopAll()
                        this.scene.start('Overworld')
                        evt.destroy()
                    } else {
                        this.intro.setTexture(`intro_${idx}`)
                        idx++
                    }
                },
                callbackScope: this,
                loop: true
            })
        })
    }
}
