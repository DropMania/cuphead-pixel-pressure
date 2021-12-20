export default class Body extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame, options) {
        super(scene.matter.world, x, y, texture, frame, options)
        this.scene.add.existing(this)

        this.speed = 1
        this.setFixedRotation()
        this.touchingGround = false

        /* this.setOnCollide((e) => {
            if (e.bodyB.name == 'Ground' || e.bodyA.name == 'Ground') {
                this.touchingGround = true
            }
        })
        this.setOnCollideEnd((e) => {
            if (e.bodyA.name === 'Ground' || e.bodyB.name === 'Ground') {
                this.scene.add
                this.touchingGround = false
            }
        }) */
        /* this.setOnCollideActive((e) => {
            if (e.bodyA.name === 'Ground' && e.bodyB.name === this.body.name) {
                this.touchingGround = true
            } else {
                this.touchingGround = false
            }
            if (this.body.name == 'cuphead') {
                console.log(
                    e.bodyA.name,
                    e.bodyB.name,
                    e.bodyA.name === 'Ground' &&
                        e.bodyB.name === this.body.name,
                    this.touchingGround
                )
            }
            //console.log(this.touchingGround)
        }) */
    }
    update() {
        if (
            this.scene.ground.some(
                (g) => this.scene.matter.sat.collides(this.body, g).collided
            )
        ) {
            this.touchingGround = true
        } else {
            this.touchingGround = false
        }
    }
}
