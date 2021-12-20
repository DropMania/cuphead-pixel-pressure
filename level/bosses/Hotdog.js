import Boss from '../Boss.js'
import { createAnimations } from './hotdogFunc.js'
export default class HotDog extends Boss {
    static preload(scene) {
        scene.load.spritesheet(
            'dance',
            'level/sprites/bosses/hotdog/dance.png',
            {
                frameWidth: 70,
                frameHeight: 75
            }
        )
        scene.load.spritesheet(
            'mini-dog',
            'level/sprites/projectiles/hotdog.png',
            {
                frameWidth: 15,
                frameHeight: 15
            }
        )
    }
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, {
            name: 'hotdog',
            shape: {
                type: 'rectangle',
                width: 10,
                height: 35
            },
            render: {
                sprite: {
                    yOffset: 0.15
                }
            }
        })
        createAnimations(this)
        this.isJumping = false
        this.play('dance')
        this.setMass(0.1)
        this.health = 30
        this.maxHealth = 30
        this.hotdogburstEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.hotdogburst,
            callbackScope: this,
            paused: true,
            loop: true
        })
    }
    hotdogburst() {
        let dog = this.scene.matter.add.sprite(this.x, this.y, 'mini-dog', 0, {
            restitution: 0.5,
            friction: 0.1,
            density: 0.001,
            isStatic: false,
            label: 'hotdog',
            name: 'mini-hotdog',
            shape: {
                type: 'circle',
                radius: 5
            }
        })
        dog.applyForce({ x: this.cupheadIsRight ? -0.0005 : 0.0005, y: -0.002 })

        dog.setOnCollideWith(this.scene.cuphead, () => {
            dog.destroy()
            this.scene.cuphead.emit('hit')
        })
        this.scene.time.addEvent({
            delay: 700,
            callback: () => {
                dog.destroy()
            }
        })
    }
    update() {
        super.update()
        if (this.cupheadIsRight) {
            this.setFlipX(false)
        } else {
            this.setFlipX(true)
        }
        if (!this.isJumping && this.touchingGround) {
            this.applyForce({
                y: -0.0055,
                x: this.cupheadIsRight ? -0.0018 : 0.0018
            })
            this.isJumping = false
        }
        if (this.healthPercent < 25 && this.hotdogburstEvent.paused) {
            this.hotdogburstEvent.paused = false
        }
    }
}
