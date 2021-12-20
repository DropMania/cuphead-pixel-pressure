import Boss from '../Boss.js'
import Projectile from '../Projectile.js'
import { createAnimations } from './mugmanFunc.js'

export default class Grim extends Boss {
    static preload(scene) {
        scene.load.spritesheet(
            'mug_idle',
            'level/sprites/bosses/mugman/idle.png',
            {
                frameWidth: 24,
                frameHeight: 39
            }
        )
        scene.load.spritesheet(
            'mug_jump',
            'level/sprites/bosses/mugman/jump.png',
            {
                frameWidth: 22,
                frameHeight: 28
            }
        )
        scene.load.spritesheet(
            'mug_run',
            'level/sprites/bosses/mugman/run.png',
            {
                frameWidth: 37,
                frameHeight: 44
            }
        )
        scene.load.spritesheet(
            'mug_run_shoot',
            'level/sprites/bosses/mugman/run_shoot.png',
            {
                frameWidth: 38,
                frameHeight: 42
            }
        )
        scene.load.spritesheet(
            'mug_shoot',
            'level/sprites/bosses/mugman/shoot.png',
            {
                frameWidth: 31,
                frameHeight: 37
            }
        )
    }
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, {
            name: 'mugman',
            shape: {
                type: 'rectangle',
                width: 10,
                height: 15
            }
        })
        this.setOrigin(0.5, 0.65)
        createAnimations(this)
        this.play('mug_idle')
        this.speed = 1.5
        this.isRunning = false
        this.isJumping = false
        this.isShooting = false
        this.jumpEvent = this.scene.time.addEvent({
            delay: 3000,
            callback: this.jump,
            callbackScope: this,
            loop: true
        })
        this.scene.time.addEvent({
            delay: 5000,
            callback: this.shoot,
            callbackScope: this,
            loop: true
        })
    }
    jump() {
        this.isJumping = true
        this.applyForce({ x: 0, y: -0.0065 })
        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.isJumping = false
            }
        })
    }
    shoot() {
        this.scene.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: () => {
                this.isShooting = true
                let shootcount = 1
                if (this.healthPercent < 25) {
                    shootcount = 3
                } else if (this.healthPercent < 50) {
                    shootcount = 2
                }
                let i = 0
                this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        i++
                        new Projectile(
                            this.scene,
                            this,
                            {
                                x: this.scene.cuphead.x,
                                y: this.scene.cuphead.y
                            },
                            'fire',
                            true,
                            {
                                name: 'projectile',
                                isSensor: true,
                                shape: {
                                    type: 'circle',
                                    radius: 3
                                }
                            },
                            3,
                            1500
                        )
                        if (i === shootcount) {
                            this.isShooting = false
                        }
                    },
                    repeat: shootcount - 1
                })
            }
        })
    }
    update() {
        super.update()
        console.log(this.healthPercent, this.scene.cuphead.lifes)
        this.setVelocityX((this.cupheadIsRight ? -1 : 1) * this.speed)
        if (this.body.velocity.x > 0) {
            this.flipX = false
            if (this.isJumping) {
                this.play('mug_jump', true)
            } else if (this.isShooting) {
                this.play('mug_run_shoot', true)
            } else {
                this.play('mug_run', true)
            }
        } else if (this.body.velocity.x < 0) {
            this.flipX = true
            if (this.isJumping) {
                this.play('mug_jump', true)
            } else if (this.isShooting) {
                this.play('mug_run_shoot', true)
            } else {
                this.play('mug_run', true)
            }
        } else {
            if (this.isJumping) {
                this.play('mug_jump', true)
            } else if (this.isShooting) {
                this.play('mug_shoot', true)
            } else {
                this.play('mug_idle', true)
            }
        }
    }
}
