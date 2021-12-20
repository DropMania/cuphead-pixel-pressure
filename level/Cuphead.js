import Body from './Body.js'
import Projectile from './Projectile.js'
import { walkLogic, createAnimations, load } from './cupheadFunc.js'
export default class Cuphead extends Body {
    static preload(scene) {
        load(scene)
    }
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, {
            name: 'cuphead',
            shape: {
                type: 'rectangle',
                width: 15,
                height: 25
            },
            collisionFilter: {
                group: 2
            }
        })
        this.setOrigin(0.5, 0.65)
        this.setMass(0.5)
        createAnimations(this)
        this.speed = 3
        this.play('run')
        this.isJumping = false
        this.isShooting = false
        this.scene.input.on('pointerdown', () => {
            this.isShooting = true
        })
        this.scene.input.on('pointerup', () => {
            this.isShooting = false
        })
        this.shootDir = 'right'
        this.standing = false
        this.scene.keys.shift.on('down', () => {
            this.standing = true
        })
        this.scene.keys.shift.on('up', () => {
            this.standing = false
        })
        this.shootRate = 10
        this.elapsed = 0
        this.jumped = false
        this.scene.keys.space.on('down', () => {
            this.jumped = true
        })
        this.on('hit', this.gotHit)
        this.lifes = 3
        this.scene.events.emit('lifeUpdate', {
            lifes: this.lifes
        })
        this.cooldown = false
    }
    gotHit() {
        if (!this.cooldown) {
            this.cooldown = true
            this.scene.cameras.main.shake(100, 0.00008)
            this.lifes--
            this.scene.events.emit('lifeUpdate', {
                lifes: this.lifes
            })
            if (this.lifes === 0) {
                console.log('game over')
                this.scene.events.emit('gameOver')
            }
            this.setTint(0xff0000)
            this.scene.time.addEvent({
                delay: 100,
                callback: () => {
                    this.setTint(0xffffff)
                    this.cooldown = false
                }
            })
        }
    }
    shoot() {
        let source = { x: this.x, y: this.y - 5 }
        let target = { x: this.x, y: this.y - 5 }
        if (this.shootDir === 'right') {
            source.x += this.width / 2
            target.x += source.x + 1
        } else if (this.shootDir === 'left') {
            source.x -= this.width / 2
            target.x -= source.x + 1
        } else if (this.shootDir === 'up') {
            source.y -= this.height / 2
            target.y -= source.y + 1
        } else if (this.shootDir === 'left-up') {
            source.x -= this.width / 2
            source.y -= this.height / 2
            target.x -= source.x + 1
            target.y -= source.y + 1
        } else if (this.shootDir === 'right-up') {
            source.x += this.width / 2
            source.y -= this.height / 2
            target.x += source.x + 1
            target.y -= source.y + 1
        }
        new Projectile(this.scene, source, target, 'pea', false, {
            name: 'projectile',
            isSensor: true,
            shape: {
                type: 'circle',
                radius: 5
            },
            render: {
                sprite: {
                    xOffset: 0.3
                }
            }
        })
    }
    update() {
        super.update()
        walkLogic(this)
        if (this.isShooting) {
            if (this.elapsed % this.shootRate === 0) {
                this.shoot()
            }
        }
        this.elapsed++
    }
}
