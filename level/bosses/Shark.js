import Boss from '../Boss.js'
import { createAnimations } from './sharkFunc.js'
export default class HotDog extends Boss {
    static preload(scene) {
        scene.load.spritesheet(
            'shark',
            'level/sprites/bosses/shark/shark.png',
            {
                frameWidth: 210,
                frameHeight: 135
            }
        )
        scene.load.spritesheet(
            'bubble',
            'level/sprites/projectiles/bubble.png',
            {
                frameWidth: 26,
                frameHeight: 26
            }
        )
        scene.load.spritesheet(
            'cannonball',
            'level/sprites/projectiles/cannonball.png',
            {
                frameWidth: 49,
                frameHeight: 25
            }
        )
    }
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, {
            name: 'shark',
            shape: {
                type: 'rectangle',
                width: 170,
                height: 135
            },
            render: {
                sprite: {
                    yOffset: -0.15
                }
            }
        })
        createAnimations(this)
        this.play('shark')
        this.flipX = true
        this.scene.time.addEvent({
            delay: 900,
            callback: this.bubbleburst,
            callbackScope: this,
            loop: true
        })
        this.cannonEvent = this.scene.time.addEvent({
            delay: 5000,
            callback: this.cannonball,
            callbackScope: this,
            loop: true
        })
        this.health = 150
        this.maxHealth = 150
    }
    bubbleburst() {
        let count = 1
        if (this.healthPercent < 25) {
            count = 3
        } else if (this.healthPercent < 50) {
            count = 2
        }
        for (let i = 0; i < count; i++) {
            let bubble = this.scene.matter.add.sprite(
                this.x - 50,
                this.y + 40,
                'bubble',
                0,
                {
                    restitution: 0.5,
                    friction: 0.1,
                    density: 0.001,
                    isStatic: false,
                    isSensor: true,
                    label: 'bubble',
                    name: 'mini-bubble',
                    shape: {
                        type: 'circle',
                        radius: 10
                    }
                }
            )
            bubble.anims.create({
                key: 'bubble',
                frames: bubble.anims.generateFrameNumbers('bubble', {
                    start: 0,
                    end: 12
                }),
                frameRate: 20,
                repeat: -1
            })
            bubble.play('bubble')

            bubble.applyForce({
                x: Phaser.Math.FloatBetween(-0.003, -0.001),
                y: -0.004
            })
            bubble.setScale(0.5)
            bubble.setOnCollideWith(this.scene.cuphead, () => {
                bubble.destroy()
                this.scene.cuphead.emit('hit')
            })
            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    bubble.destroy()
                }
            })
        }
    }
    cannonball() {
        if (this.healthPercent < 25) {
            this.cannonEvent.timeScale = 2
        } else if (this.healthPercent < 50) {
            this.cannonEvent.timeScale = 1.5
        }
        let cannonball = this.scene.matter.add.sprite(
            this.scene.map.widthInPixels - 10,
            180,
            'cannonball',
            0,
            {
                isStatic: false,
                isSensor: true,
                ignoreGravity: true,
                shape: {
                    type: 'circle',
                    radius: 10
                },
                render: {
                    sprite: {
                        xOffset: -0.2
                    }
                }
            }
        )
        cannonball.setFixedRotation()
        cannonball.anims.create({
            key: 'cannonball',
            frames: cannonball.anims.generateFrameNumbers('cannonball', {
                start: 0,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        })
        cannonball.play('cannonball')

        cannonball.setOnCollideWith(this.scene.cuphead, () => {
            cannonball.destroy()
            this.scene.cuphead.emit('hit')
        })
        cannonball.setVelocityX(-7)
        this.scene.time.addEvent({
            delay: 7000,
            callback: () => {
                cannonball.destroy()
            }
        })
    }
    update() {
        super.update()
    }
}
