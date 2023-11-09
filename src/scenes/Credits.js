class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }
    create() {
        this.add.text(game.config.width/2, game.config.height/8, 'CREDITS', { fontFamily: 'After Hours', fontSize: 64 } ).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4,  'Assets: Justin Xu', { fontFamily: 'After Hours', fontSize: 20 }).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4+ 64, 'Music: https://www.youtube.com/watch?v=K4DyBUG242c&ab_channel=NoCopyrightSounds', { fontFamily: 'After Hours', fontSize: 20 } ).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'SFX: Explosion: https://pixabay.com/sound-effects/explosion-6055/\n' +
        'CarNoises: https://pixabay.com/sound-effects/car-motor-revving-99317/,\n' + 'https://pixabay.com/sound-effects/carengine-5998/,\n' +
        'https://pixabay.com/sound-effects/wheel-spin-on-gravel-106641/\n' , { fontFamily: 'After Hours', fontSize: 20 } ).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 192, 'Press UP ARROW to return to menu', { fontFamily: 'After Hours', fontSize: 20 } ).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('titleScene')
        }
    }
}

