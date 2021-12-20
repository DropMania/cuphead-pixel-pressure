export function createAnimations(shark) {
    const frameRate = 20
    shark.anims.create({
        key: 'shark',
        frames: shark.anims.generateFrameNumbers('shark', {
            start: 0,
            end: 9
        }),
        frameRate,
        repeat: -1,
        yoyo: true
    })
}
