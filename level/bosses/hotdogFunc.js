export function createAnimations(hd) {
    const frameRate = 20
    hd.anims.create({
        key: 'dance',
        frames: hd.anims.generateFrameNumbers('dance', {
            start: 0,
            end: 9
        }),
        frameRate,
        repeat: -1
    })
}
