export function createAnimations(projectile) {
    const frameRate = 25
    projectile.anims.create({
        key: 'pea',
        frames: projectile.anims.generateFrameNumbers('pea', {
            start: 0,
            end: 7
        }),
        frameRate,
        repeat: -1
    })
    projectile.anims.create({
        key: 'fire',
        frames: projectile.anims.generateFrameNumbers('fire', {
            start: 0,
            end: 19
        }),
        frameRate,
        repeat: -1
    })
}
