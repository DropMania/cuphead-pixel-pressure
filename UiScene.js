import Window from './Window.js'
export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true })
    }
    preload() {
        this.load.setBaseURL('assets/')
        Window.preload(this)
    }
    create() {
        this.cameras.main.setSize(window.innerWidth, window.innerHeight)
        this.cameras.main.setViewport(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        )
        this.cameras.main.setZoom(3)
        this.cameras.main.setVisible(true)
        this.levelScene = this.scene.get('Level')
        this.overworldScene = this.scene.get('Overworld')
        this.window = null
        this.input.keyboard.on('keydown', (event) => {
            if (this.window) {
                if (event.key === 'Escape') {
                    this.window.emit('close')
                }
                if (event.key === 'd') {
                    this.window.moveCursor(1)
                }
                if (event.key === 'a') {
                    this.window.moveCursor(-1)
                }
                if (event.key === ' ') {
                    this.window.emit('Select', this.window.cursor)
                }
            }
        })

        this.overworldScene.events.on('level', (level) => {
            this.window = new Window(
                this,
                window.innerWidth / 2,
                window.innerHeight / 2,
                'window',
                'Level ' + level,
                ['Start', 'Cancel']
            )
            this.overworldScene.events.emit('pause')
            this.window.on('close', () => {
                this.overworldScene.events.emit('resume')
                this.window.delete()
                this.window = null
            })
            this.window.on('Select', (button) => {
                console.log(button)
                if (button === 0) {
                    this.scene.pause('Overworld')
                    this.scene.launch('Level', { level })
                    this.window.delete()
                    this.window = null
                } else {
                    this.window.delete()
                    this.window = null
                    this.overworldScene.events.emit('resume')
                }
            })
        })
    }
}
