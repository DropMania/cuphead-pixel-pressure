import Boss from '../Boss.js'
import Projectile from '../Projectile.js'
import { createAnimations } from './grimFunc.js'

export default class Grim extends Boss {
    static preload(scene) {
        scene.load.spritesheet('fly', 'level/sprites/bosses/grim/fly.png', {
            frameWidth: 50,
            frameHeight: 42
        })
        scene.load.spritesheet('shoot', 'level/sprites/bosses/grim/shoot.png', {
            frameWidth: 61,
            frameHeight: 64
        })
    }
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, {
            name: 'grim'
        })
        this.setIgnoreGravity(true)
        createAnimations(this)
        this.isRight = true
        this.scene.time.addEvent({
            delay: 5000,
            callback: this.fly,
            callbackScope: this,
            loop: true
        })
        this.shootEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.shoot,
            callbackScope: this,
            loop: true
        })
        this.play('fly')
    }
    fly() {
        if (this.isRight) {
            this.setVelocityX(5)
        } else {
            this.setVelocityX(-5)
        }
        this.isRight = !this.isRight
    }
    shoot() {
        this.play('shoot')
        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                if (this.healthPercent < 20) {
                    for (let i = -1; i < 2; i++) {
                        new Projectile(
                            this.scene,
                            this,
                            {
                                x: this.scene.cuphead.x + i * 100,
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
                    }
                } else {
                    new Projectile(
                        this.scene,
                        this,
                        this.scene.cuphead,
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
                        5000
                    )
                }
            },
            callbackScope: this,
            loop: false
        })
    }
    update() {
        super.update()
        if (this.cupheadIsRight) {
            this.setFlipX(true)
        } else {
            this.setFlipX(false)
        }
        if (this.healthPercent < 20) {
            this.shootEvent.timeScale = 1
        } else if (this.healthPercent < 50) {
            this.shootEvent.timeScale = 1.5
        } else if (this.healthPercent < 75) {
            this.shootEvent.timeScale = 1.2
        }
    }
}
