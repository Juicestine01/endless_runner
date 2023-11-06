class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        this.add.text(game.config.width/2, game.config.height/3, 'SWIMMING TRHU TRAFFIC', { fontFamily: 'After Hours', fontSize: 64 } ).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +64, 'Use the UP and DOWN ARROWS to drive through traffic', { fontFamily: 'After Hours', fontSize: 32 }).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press UP ARROW to Start', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene')
        }
    }

}