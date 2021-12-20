export function walkLogic(cuphead) {
    let dirX = 0
    if (cuphead.touchingGround) {
        cuphead.isJumping = false
    }
    if (
        cuphead.scene.keys.space.isDown &&
        cuphead.touchingGround &&
        cuphead.jumped
    ) {
        if (!cuphead.standing) {
            cuphead.jumped = false
            cuphead.applyForce({
                x: 0,
                y: -0.02
            })
            cuphead.play('jump', true)
            cuphead.isJumping = true
        }
    }
    if (cuphead.scene.keys.left.isDown && cuphead.scene.keys.up.isDown) {
        cuphead.flipX = true
        if (!cuphead.standing) {
            if (cuphead.isJumping) {
                cuphead.play('jump', true)
            } else if (cuphead.isShooting) {
                cuphead.play('shoot_run_diagonal', true)
                cuphead.shootDir = 'left-up'
            } else {
                cuphead.play('run', true)
            }
            dirX = -1
        } else {
            if (cuphead.isJumping) {
                cuphead.play('jump', true)
            } else if (cuphead.isShooting) {
                cuphead.play('shoot_diagonal', true)
                cuphead.shootDir = 'left-up'
            } else {
                cuphead.play('idle', true)
            }
        }
    } else if (
        cuphead.scene.keys.right.isDown &&
        cuphead.scene.keys.up.isDown
    ) {
        cuphead.flipX = false
        if (!cuphead.standing) {
            if (cuphead.isJumping) {
                cuphead.play('jump', true)
            } else if (cuphead.isShooting) {
                cuphead.play('shoot_run_diagonal', true)
                cuphead.shootDir = 'right-up'
            } else {
                cuphead.play('run', true)
            }
            dirX = 1
        } else {
            if (cuphead.isJumping) {
                cuphead.play('jump', true)
            } else if (cuphead.isShooting) {
                cuphead.play('shoot_diagonal', true)
                cuphead.shootDir = 'right-up'
            } else {
                cuphead.play('idle', true)
            }
        }
    } else if (cuphead.scene.keys.left.isDown) {
        cuphead.flipX = true
        if (!cuphead.standing) {
            if (cuphead.isJumping) {
                cuphead.play('jump', true)
            } else if (cuphead.isShooting) {
                cuphead.play('shoot_run', true)
                cuphead.shootDir = 'left'
            } else {
                cuphead.play('run', true)
            }
            dirX = -1
        } else {
            if (cuphead.isShooting) {
                cuphead.play('shoot_straight', true)
                cuphead.shootDir = 'left'
            } else {
                cuphead.play('idle', true)
            }
        }
    } else if (cuphead.scene.keys.right.isDown) {
        cuphead.flipX = false
        if (!cuphead.standing) {
            if (cuphead.isJumping) {
                cuphead.play('jump', true)
            } else if (cuphead.isShooting) {
                cuphead.play('shoot_run', true)
                cuphead.shootDir = 'right'
            } else {
                cuphead.play('run', true)
            }
            dirX = 1
        } else {
            if (cuphead.isShooting) {
                cuphead.play('shoot_straight', true)
                cuphead.shootDir = 'right'
            } else {
                cuphead.play('idle', true)
            }
        }
    } else if (cuphead.scene.keys.up.isDown) {
        if (cuphead.isJumping) {
            cuphead.play('jump', true)
        } else if (cuphead.isShooting) {
            cuphead.play('shoot_up', true)
            cuphead.shootDir = 'up'
        } else {
            cuphead.play('idle', true)
        }
    } else {
        if (cuphead.isJumping) {
            cuphead.play('jump', true)
        } else if (cuphead.isShooting) {
            cuphead.play('shoot_straight', true)
            cuphead.shootDir = cuphead.flipX ? 'left' : 'right'
        } else {
            cuphead.play('idle', true)
        }
    }
    cuphead.setVelocityX(dirX * cuphead.speed)
}
export function createAnimations(cuphead) {
    const frameRate = 20
    cuphead.anims.create({
        key: 'run',
        frames: cuphead.anims.generateFrameNumbers('run', {
            start: 0,
            end: 15
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'jump',
        frames: cuphead.anims.generateFrameNumbers('jump', {
            start: 0,
            end: 7
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'idle',
        frames: cuphead.anims.generateFrameNumbers('idle', {
            start: 0,
            end: 5
        }),
        frameRate: 15,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'shoot_diagonal',
        frames: cuphead.anims.generateFrameNumbers('shoot_diagonal', {
            start: 0,
            end: 2
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'shoot_up',
        frames: cuphead.anims.generateFrameNumbers('shoot_up', {
            start: 0,
            end: 2
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'shoot_straight',
        frames: cuphead.anims.generateFrameNumbers('shoot_straight', {
            start: 0,
            end: 2
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'shoot_run',
        frames: cuphead.anims.generateFrameNumbers('shoot_run', {
            start: 0,
            end: 15
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'shoot_run_diagonal',
        frames: cuphead.anims.generateFrameNumbers('shoot_run_diagonal', {
            start: 0,
            end: 15
        }),
        frameRate,
        repeat: -1
    })
}
export function load(scene) {
    scene.load.spritesheet('run', 'level/sprites/cuphead/run.png', {
        frameWidth: 34,
        frameHeight: 42
    })
    scene.load.spritesheet('jump', 'level/sprites/cuphead/jump.png', {
        frameWidth: 22,
        frameHeight: 27
    })
    scene.load.spritesheet('idle', 'level/sprites/cuphead/idle.png', {
        frameWidth: 25,
        frameHeight: 38
    })
    scene.load.spritesheet(
        'shoot_diagonal',
        'level/sprites/cuphead/shoot_diagonal.png',
        {
            frameWidth: 31,
            frameHeight: 37
        }
    )
    scene.load.spritesheet('shoot_run', 'level/sprites/cuphead/shoot_run.png', {
        frameWidth: 36,
        frameHeight: 40
    })
    scene.load.spritesheet(
        'shoot_run_diagonal',
        'level/sprites/cuphead/shoot_run_diagonal.png',
        {
            frameWidth: 35,
            frameHeight: 39
        }
    )
    scene.load.spritesheet(
        'shoot_straight',
        'level/sprites/cuphead/shoot_straight.png',
        {
            frameWidth: 31,
            frameHeight: 39
        }
    )
    scene.load.spritesheet('shoot_up', 'level/sprites/cuphead/shoot_up.png', {
        frameWidth: 27,
        frameHeight: 43
    })
}
