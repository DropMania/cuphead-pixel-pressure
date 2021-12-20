export function createAnimations(grim) {
    const frameRate = 20
    grim.anims.create({
        key: 'fly',
        frames: grim.anims.generateFrameNumbers('fly', {
            start: 0,
            end: 9
        }),
        frameRate,
        repeat: -1
    })
    grim.anims.create({
        key: 'shoot',
        frames: grim.anims.generateFrameNumbers('shoot', {
            start: 0,
            end: 19
        }),
        frameRate,
        repeat: 1
    })
}
