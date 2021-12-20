import Cuphead from './level/Cuphead.js'
import Projectile from './level/Projectile.js'
import Grim from './level/bosses/Grim.js'
import Hotdog from './level/bosses/Hotdog.js'
import Shark from './level/bosses/Shark.js'
import Mugman from './level/bosses/Mugman.js'
export default class Level extends Phaser.Scene {
    constructor(game) {
        super()
        this.game = game
        Phaser.Scene.call(this, { key: 'Level' })
    }
    init(data) {
        this.level = data.level || 4
        this.matter.world.setGravity(0, 3)
    }
    preload() {
        this.load.setBaseURL('assets/')
        Cuphead.preload(this)
        Projectile.preload(this)
        if (this.level == 1) {
            Grim.preload(this)
        } else if (this.level == 2) {
            Hotdog.preload(this)
        } else if (this.level == 3) {
            Shark.preload(this)
        } else if (this.level == 4) {
            Mugman.preload(this)
        }
        this.load.image(
            `level_${this.level}_ground`,
            `level/levels/level_${this.level}_ground.png`
        )
        this.load.image(
            `level_${this.level}_forground`,
            `level/levels/level_${this.level}_forground.png`
        )
        this.load.tilemapTiledJSON(
            `level_${this.level}_map`,
            `level/levels/level_${this.level}.json`
        )
        this.load.audio(
            `level_${this.level}_song`,
            `level/levels/level_${this.level}.mp3`
        )
    }
    create() {
        this.projectiles = []
        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            hit: Phaser.Input.Keyboard.KeyCodes.E,
            esc: Phaser.Input.Keyboard.KeyCodes.ESC,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        })
        this.map = this.make.tilemap({ key: `level_${this.level}_map` })
        this.tileset = this.map.addTilesetImage(
            `level_${this.level}_ground`,
            `level_${this.level}_ground`
        )
        this.fortileset = this.map.addTilesetImage(
            `level_${this.level}_forground`,
            `level_${this.level}_forground`
        )
        this.background = this.map.createLayer('Ground', this.tileset, 0, 0)
        this.background.setCollisionByProperty({ collides: true })

        this.matter.world.convertTilemapLayer(this.background, {
            name: 'Ground',
            collisionFilter: {
                group: 3
            }
        })
        this.ground = this.matter.world
            .getAllBodies()
            .filter((body) => body.name === 'Ground')
        this.matter.world.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        )
        this.cuphead = new Cuphead(this, 100, 180, 'run', 0)
        this.cameras.main.setZoom(5)
        this.cameras.main.startFollow(this.cuphead)
        this.cameras.main.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        )

        if (this.level == 1) {
            this.boss = new Grim(this, this.map.widthInPixels - 100, 30, 1, 0)
        } else if (this.level == 2) {
            this.boss = new Hotdog(
                this,
                this.map.widthInPixels - 100,
                150,
                1,
                0
            )
        } else if (this.level == 3) {
            this.boss = new Shark(this, this.map.widthInPixels - 105, 100, 1, 0)
        } else if (this.level == 4) {
            this.boss = new Mugman(
                this,
                this.map.widthInPixels - 100,
                200,
                1,
                0
            )
        }

        this.fortileset = this.map.createLayer(
            'Forground',
            this.fortileset,
            0,
            0
        )
        this.keys.esc.on('down', () => {
            //this.scene.launch('Overworld')
            this.scene.stop('Level')
            this.sound.stopAll()
            this.scene.resume('Overworld')
        })
        this.sound.stopAll()
        this.sound.play(`level_${this.level}_song`, {
            volume: 0.5
        })
    }

    update() {
        this.cuphead.update()
        if (this.boss) {
            this.boss.update()
        }
        this.projectiles.forEach((projectile) => {
            if (projectile.active) {
                projectile.update()
            }
        })
        this.projectiles = this.projectiles.filter((projectile) => {
            return projectile.active
        })
    }
}
