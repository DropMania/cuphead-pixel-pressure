import Window from './Window.js'
import { getLeaderboard, addEntry } from './firebase.js'
export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true })
    }
    preload() {
        this.load.setBaseURL('assets/')
        Window.preload(this)
        this.load.spritesheet('wallop', 'wallop.png', {
            frameWidth: 256,
            frameHeight: 144
        })
        this.load.spritesheet('victory', 'victory.png', {
            frameWidth: 240,
            frameHeight: 136
        })
        this.load.image('heart', 'heart.png')
    }
    create() {
        this.anims.create({
            key: 'wallop',
            frames: this.anims.generateFrameNumbers('wallop', {
                start: 0,
                end: 49
            }),
            frameRate: 20,
            repeat: 0
        })
        this.anims.create({
            key: 'victory',
            frames: this.anims.generateFrameNumbers('victory', {
                start: 0,
                end: 25
            }),
            frameRate: 20,
            repeat: 0
        })

        getLeaderboard('2').then(({ top, my }) => {
            console.log(top, my)
        })
        if (!localStorage.getItem('username')) {
            let username = prompt(
                'Enter your username: \n (This will only be used for the leaderboard and is not required)'
            )
            localStorage.setItem('username', username)
        }
        this.cameras.main.setSize(window.innerWidth, window.innerHeight)
        this.cameras.main.setViewport(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        )
        this.cameras.main.setZoom(2)
        this.cameras.main.setVisible(true)
        this.levelScene = this.scene.get('Level')
        this.overworldScene = this.scene.get('Overworld')
        this.window = null
        this.leaderboard = null
        this.finishedLevels = []
        this.timeText = this.add.text(1350, 250, '00:00', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        })
        this.heartImg = this.add.image(550, 275, 'heart')
        this.heartImg.setScale(2.5)
        this.heartText = this.add.text(543, 266, '3', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        })
        this.timeText.visible = false
        this.heartImg.visible = false
        this.heartText.visible = false
        this.input.keyboard.on('keydown', (event) => {
            if (this.window) {
                if (event.key === 'Escape') {
                    if (this.leaderboard) {
                        this.leaderboard.destroy()
                        this.leaderboard.textBox.destroy()
                        this.leaderboard = null
                    } else {
                        this.window.emit('close')
                    }
                }
                if (event.key === 's') {
                    this.window.moveCursor(1)
                }
                if (event.key === 'w') {
                    this.window.moveCursor(-1)
                }
                if (event.key === ' ') {
                    if (this.leaderboard) {
                        this.leaderboard.destroy()
                        this.leaderboard.textBox.destroy()
                        this.leaderboard = null
                    } else {
                        this.window.emit('Select', this.window.cursor)
                    }
                }
            }
        })

        this.overworldScene.events.on('level', (level) => {
            let text = `Level ${level}`
            let buttons = ['Start', 'Leaderboard', 'Cancel']
            console.log(level)
            if (level == '4' && this.finishedLevels.length < 3) {
                text = `You have not finished\n all the levels yet!\n (${this.finishedLevels.length}/3)`
                buttons = ['Close']
            }

            this.window = new Window(
                this,
                window.innerWidth / 2,
                window.innerHeight / 2,
                'window',
                text,
                buttons
            )
            this.scene.pause('Overworld')
            this.window.on('close', () => {
                this.scene.resume('Overworld')
                this.window.delete()
                this.window = null
            })
            this.window.on('Select', (button) => {
                if (level == '4' && this.finishedLevels.length < 3) {
                    this.window.delete()
                    this.window = null
                    this.scene.resume('Overworld')
                } else {
                    if (button === 0) {
                        this.scene.launch('Level', { level })
                        this.timeText.visible = true
                        this.heartImg.visible = true
                        this.heartText.visible = true
                        let overlay = this.add.sprite(
                            window.innerWidth / 2,
                            window.innerHeight / 2,
                            'wallop',
                            0
                        )
                        overlay.setScale(3.5)
                        overlay.play('wallop')
                        overlay.on('animationcomplete', () => {
                            overlay.destroy()
                        })
                        this.window.delete()
                        this.window = null
                    } else if (button === 1) {
                        this.openLeaderboard(level)
                    } else {
                        this.window.delete()
                        this.window = null
                        this.scene.resume('Overworld')
                    }
                }
            })
        })
        this.levelScene.events.on('gameOver', () => {
            this.scene.pause('Level')
            this.window = new Window(
                this,
                window.innerWidth / 2,
                window.innerHeight / 2,
                'window',
                'Game Over',
                ['Restart', 'Leaderboard', 'Cancel']
            )
            this.window.on('close', () => {
                this.scene.stop('Level')
                this.scene.resume('Overworld')
                this.sound.stopAll()
                this.overworldScene.sound.play('music', {
                    volume: 0.2
                })
                this.timeText.visible = false
                this.heartImg.visible = false
                this.heartText.visible = false
                this.window.delete()
                this.window = null
            })
            this.window.on('Select', (button) => {
                if (button === 0) {
                    this.scene.resume('Level')
                    this.scene.launch('Level', { level: this.levelScene.level })
                    this.window.delete()
                    this.window = null
                } else if (button === 1) {
                    this.openLeaderboard(this.levelScene.level)
                } else {
                    this.window.delete()
                    this.window = null
                    this.scene.stop('Level')
                    this.scene.resume('Overworld')
                    this.timeText.visible = false
                    this.heartImg.visible = false
                    this.heartText.visible = false
                    this.sound.stopAll()
                    this.overworldScene.sound.play('music', {
                        volume: 0.2
                    })
                }
            })
        })
        this.levelScene.events.on('win', ({ time, level }) => {
            if (!this.finishedLevels.includes(level)) {
                this.finishedLevels.push(level)
            }
            if (localStorage.getItem('username')) {
                addEntry(level, time)
            }
            let overlay = this.add.sprite(
                window.innerWidth / 2,
                window.innerHeight / 2,
                'victory',
                0
            )
            overlay.setScale(4)
            overlay.play('victory')
            this.scene.pause('Level')

            overlay.on('animationcomplete', () => {
                overlay.destroy()
                let text = `Level ${level} complete!\nTime: ${formatS(time)}`
                if (level == '4') {
                    text = `
Congratulations!
You saved Mugman from 
the curse of the devil!

Special thanks to MDHR,
the creators of Cuphead for 
making such a great game!

Thanks for playing!

of course, you can still
play the game to get to
the leaderboard!`
                }
                this.window = new Window(
                    this,
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    'window',
                    text,
                    ['Again', 'Leaderboard', 'Exit']
                )
                if (level == '4') {
                    this.window.setScale(4)
                    this.window.info.visible = false
                    this.window.title.setY(390)
                    this.window.buttons.forEach((button, i) => {
                        button.setY(button.y + 90)
                    })
                }
                this.window.on('close', () => {
                    this.scene.stop('Level')
                    this.scene.resume('Overworld')
                    this.timeText.visible = false
                    this.heartImg.visible = false
                    this.heartText.visible = false
                    this.sound.stopAll()
                    this.overworldScene.sound.play('music', {
                        volume: 0.2
                    })
                    this.window.delete()
                    this.window = null
                })
                this.window.on('Select', (button) => {
                    if (button === 0) {
                        this.scene.resume('Level')
                        this.scene.launch('Level', { level })
                        this.window.delete()
                        this.window = null
                    } else if (button === 1) {
                        this.openLeaderboard(level)
                    } else {
                        this.window.delete()
                        this.window = null
                        this.scene.stop('Level')
                        this.scene.resume('Overworld')
                        this.timeText.visible = false
                        this.heartImg.visible = false
                        this.heartText.visible = false
                        this.sound.stopAll()
                        this.overworldScene.sound.play('music', {
                            volume: 0.2
                        })
                    }
                })
            })
        })
        this.levelScene.events.on('updateTime', (time) => {
            this.timeText.setText(formatS(time))
        })
        this.levelScene.events.on('lifeUpdate', ({ lifes }) => {
            this.heartText.setText(lifes)
        })
    }
    openLeaderboard(level) {
        this.leaderboard = this.add.image(
            window.innerWidth / 2,
            window.innerHeight / 2,
            'window',
            0
        )
        this.leaderboard.setScale(3)
        getLeaderboard(level).then(({ top }) => {
            let text = 'Top 5 Times:\n\n'
            for (let i = 0; i < 5; i++) {
                if (top[i]) {
                    text += `${i + 1}. ${top[i].name} - ${formatS(
                        top[i].time
                    )}\n`
                } else {
                    text += `${i + 1}. -\n`
                }
            }
            this.leaderboard.textBox = this.add.text(
                window.innerWidth / 2,
                window.innerHeight / 2,
                text,
                {
                    fontFamily: 'Arial',
                    fontSize: '20px',
                    color: '#fff',
                    align: 'center'
                }
            )
            this.leaderboard.textBox.setOrigin(0.5)
            this.leaderboard.textBox.setWordWrapWidth(window.innerWidth / 2)
        })
    }
}

function formatS(se) {
    let m = Math.floor(se / 60)
    let s = se % 60
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}
