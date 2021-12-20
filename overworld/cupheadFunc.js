export function walkLogic(cuphead) {
    let dirX = 0
    let dirY = 0
    if (cuphead.scene.keys.down.isDown && cuphead.scene.keys.left.isDown) {
        cuphead.flipX = true
        cuphead.anims.play('walk-down-side', true)
        cuphead.direction = 'down-side'
        dirX = -1
        dirY = 1
    } else if (
        cuphead.scene.keys.down.isDown &&
        cuphead.scene.keys.right.isDown
    ) {
        cuphead.flipX = false
        cuphead.anims.play('walk-down-side', true)
        cuphead.direction = 'down-side'
        dirX = 1
        dirY = 1
    } else if (cuphead.scene.keys.up.isDown && cuphead.scene.keys.left.isDown) {
        cuphead.flipX = true
        cuphead.anims.play('walk-up-side', true)
        cuphead.direction = 'up-side'
        dirX = -1
        dirY = -1
    } else if (
        cuphead.scene.keys.up.isDown &&
        cuphead.scene.keys.right.isDown
    ) {
        cuphead.flipX = false
        cuphead.anims.play('walk-up-side', true)
        cuphead.direction = 'up-side'
        dirX = 1
        dirY = -1
    } else if (cuphead.scene.keys.down.isDown) {
        cuphead.flipX = false
        cuphead.anims.play('walk-down', true)
        cuphead.direction = 'down'
        dirY = 1
    } else if (cuphead.scene.keys.up.isDown) {
        cuphead.flipX = false
        cuphead.anims.play('walk-up', true)
        cuphead.direction = 'up'
        dirY = -1
    } else if (cuphead.scene.keys.left.isDown) {
        cuphead.flipX = true
        cuphead.anims.play('walk-side', true)
        cuphead.direction = 'side'
        dirX = -1
    } else if (cuphead.scene.keys.right.isDown) {
        cuphead.flipX = false
        cuphead.anims.play('walk-side', true)
        cuphead.direction = 'side'
        dirX = 1
    } else {
        cuphead.anims.play(`idle-${cuphead.direction}`, true)
    }
    cuphead.setVelocity(dirX * cuphead.speed, dirY * cuphead.speed)
}
export function createAnimations(cuphead) {
    const frameRate = 15
    cuphead.anims.create({
        key: 'idle-up',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 0,
            end: 3
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'walk-up',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 4,
            end: 15
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'idle-up-side',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 16,
            end: 19
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'walk-up-side',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 20,
            end: 30
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'idle-side',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 32,
            end: 35
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'walk-side',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 51,
            end: 61
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'idle-down-side',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 64,
            end: 67
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'walk-down-side',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 68,
            end: 79
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'idle-down',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 80,
            end: 88
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'walk-down',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 96,
            end: 108
        }),
        frameRate,
        repeat: -1
    })
    cuphead.anims.create({
        key: 'joy',
        frames: cuphead.anims.generateFrameNumbers('cuphead', {
            start: 112,
            end: 121
        }),
        frameRate,
        repeat: -1
    })
}
