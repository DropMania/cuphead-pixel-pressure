import Body from './Body.js'

export default class Boss extends Body {
    constructor(scene, x, y, texture, frame, options) {
        super(scene, x, y, texture, frame, options)
        this.cupheadIsRight = true
        this.moveRight = false
        this.health = 100
        this.maxHealth = 100
        this.healthPercent = (this.health / this.maxHealth) * 100
        this.on('hit', this.gotHit)
        this.setOnCollideWith(this.scene.cuphead, () => {
            this.scene.cuphead.emit('hit')
        })
    }
    gotHit() {
        this.health -= 1
        this.healthPercent = (this.health / this.maxHealth) * 100
        this.setTint(0xff0000)
        this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                this.setTint(0xffffff)
            }
        })

        if (this.health <= 0) {
            this.scene.events.emit('win', {
                level: this.scene.level,
                time: this.scene.seconds
            })
            this.scene.countEvent.destroy()
        }
    }
    update() {
        super.update()
        if (this.x > this.scene.cuphead.x) {
            this.cupheadIsRight = true
        } else {
            this.cupheadIsRight = false
        }
        if (this.body.velocity.x > 0) {
            this.moveRight = true
        } else {
            this.moveRight = false
        }
    }
}
