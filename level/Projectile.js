import { createAnimations } from './projectileFunc.js'
export default class Projectile extends Phaser.Physics.Matter.Sprite {
    static preload(scene) {
        scene.load.spritesheet('pea', 'level/sprites/projectiles/pea.png', {
            frameWidth: 40,
            frameHeight: 10
        })
        scene.load.spritesheet('fire', 'level/sprites/projectiles/fire.png', {
            frameWidth: 15,
            frameHeight: 13
        })
    }

    constructor(
        scene,
        source,
        target,
        texture,
        enemy,
        options,
        speed = 5,
        lifespan = 1000
    ) {
        super(scene.matter.world, source.x, source.y, texture, 1, options)
        this.enemy = enemy
        this.scene.add.existing(this)
        this.speed = speed
        this.setFixedRotation()
        this.setSensor(true)
        this.setMass(10000)
        this.setIgnoreGravity(true)
        this.targetAngle = Phaser.Math.Angle.BetweenPoints(source, target)
        this.setRotation(this.targetAngle)
        createAnimations(this)
        this.play(texture)
        this.active = true
        this.scene.projectiles.push(this)
        this.scene.time.addEvent({
            delay: lifespan,
            callback: () => {
                this.active = false
                this.destroy()
            },
            callbackScope: this,
            loop: false
        })
        if (!this.enemy) {
            this.setOnCollideWith(this.scene.boss.body, () => {
                this.scene.boss.emit('hit')
                this.destroy()
            })
        } else {
            this.setOnCollideWith(this.scene.cuphead.body, () => {
                this.scene.cuphead.emit('hit')
                this.destroy()
            })
        }
    }
    update() {
        this.setVelocity(
            Math.cos(this.targetAngle) * this.speed,
            Math.sin(this.targetAngle) * this.speed
        )
    }
}
