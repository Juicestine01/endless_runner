class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('background', '/assets/Street.png')
        this.load.image('car', '/assets/Car.jpeg')
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 960, 640, 'background').setOrigin(0,0)
        car = this.physics.add.sprite(32, game.config.height/2, 'car').setOrigin(0.5);
        car.setCollideWorldBounds(true);
        car.setBounce(0.5);
        car.setImmovable();
        car.destoryed = false;
        car.setMaxVelocity(0, 400);
        cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        this.bg.tilePositionX += backgroundspeed
        if (!car.destroyed) {
            if (cursors.up.isDown) {
                car.body.velocity.y -= carVelocity;
            }
            else if (cursors.down.isDown) {
                car.body.velocity.y += carVelocity;
            }
        }
    }
}