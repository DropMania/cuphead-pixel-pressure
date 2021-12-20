import Cuphead from './overworld/Cuphead.js'
import { createAnimations } from './overworld/cupheadFunc.js'
export default class Overworld extends Phaser.Scene {
    constructor(game) {
        super()
        this.game = game
        Phaser.Scene.call(this, { key: 'Overworld' })
    }
    init(data) {}
    preload() {
        this.load.setBaseURL('assets/')
        this.load.image('overworld', 'overworld/overworld.png')
        this.load.image(
            'overworld_foreground',
            'overworld/overworld_foreground.png'
        )
        this.load.tilemapTiledJSON('map', 'overworld/overworld.json')
        this.load.image('level', 'overworld/level.png')
        this.load.audio('music', 'overworld/song.mp3')
        Cuphead.preload(this)
    }
    create() {
        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            hit: Phaser.Input.Keyboard.KeyCodes.E,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        })
        this.map = this.make.tilemap({ key: 'map' })
        this.tileset = this.map.addTilesetImage('overworld', 'overworld')
        this.foreTileset = this.map.addTilesetImage(
            'overworld_foreground',
            'overworld_foreground'
        )
        this.background = this.map.createLayer('Ground', this.tileset, 0, 0)
        this.background.setCollisionByProperty({ collides: true })
        this.matter.world.convertTilemapLayer(this.background)
        this.matter.world.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        )
        let spawn = this.background.findTile((tile) => tile.properties.spawn)
        let levels = this.background.filterTiles(
            (tile) => tile.properties.level
        )
        let levelObjs = levels.map((level) => {
            let obj = this.matter.add.image(
                level.pixelX,
                level.pixelY,
                'level',
                0,
                {
                    isStatic: true,
                    label: 'level',
                    shape: {
                        type: 'circle',
                        width: level.width,
                        height: level.height
                    }
                }
            )
            obj.setSensor(true)
            obj.setData('level', level.properties.level)
            return obj.body
        })
        this.cuphead = new Cuphead(
            this,
            spawn.pixelX,
            spawn.pixelY,
            'cuphead',
            0
        )
        this.cuphead.setOnCollideWith(levelObjs, ({ gameObject }) => {
            this.events.emit('level', gameObject.getData('level'))
            //this.scene.start('Level', { level: gameObject.getData('level') })
        })

        this.cameras.main.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        )
        this.cameras.main.setZoom(5)
        this.cameras.main.startFollow(this.cuphead)
        this.map.createLayer('Foreground', this.foreTileset, 0, 0)
        this.sound.stopAll()
        this.sound.play('music', {
            volume: 0.2
        })
    }
    update() {
        this.cuphead.update()
    }
}
