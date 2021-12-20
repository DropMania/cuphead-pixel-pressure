export function createAnimations(mugman) {
    const frameRate = 20
    mugman.anims.create({
        key: 'mug_idle',
        frames: mugman.anims.generateFrameNumbers('mug_idle', {
            start: 0,
            end: 4
        }),
        frameRate,
        repeat: -1,
        yoyo: true
    })
    mugman.anims.create({
        key: 'mug_jump',
        frames: mugman.anims.generateFrameNumbers('mug_jump', {
            start: 0,
            end: 7
        }),
        frameRate,
        repeat: -1
    })
    mugman.anims.create({
        key: 'mug_run',
        frames: mugman.anims.generateFrameNumbers('mug_run', {
            start: 0,
            end: 8
        }),
        frameRate,
        repeat: -1
    })
    mugman.anims.create({
        key: 'mug_run_shoot',
        frames: mugman.anims.generateFrameNumbers('mug_run_shoot', {
            start: 0,
            end: 15
        }),
        frameRate,
        repeat: -1
    })
    mugman.anims.create({
        key: 'mug_shoot',
        frames: mugman.anims.generateFrameNumbers('mug_shoot', {
            start: 0,
            end: 2
        }),
        frameRate,
        repeat: -1
    })
}
