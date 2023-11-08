class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        this.add.text(game.config.width/2, game.config.height/3, 'GAME OVER', { fontFamily: 'After Hours', fontSize: 64 } ).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +64, 'HighScore: ' + highScore, { fontFamily: 'After Hours', fontSize: 32 }).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press UP ARROW to Restart', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene')
        }
    }
        
}