import Overworld from './Overworld.js'
import Level from './Level.js'
import UIScene from './UiScene.js'
import Intro from './Intro.js'
new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            }
            //debug: true
        }
    },
    fps: {
        target: 60
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [/* Intro, */ Overworld, Level, UIScene]
})
