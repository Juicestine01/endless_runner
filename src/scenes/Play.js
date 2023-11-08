class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('wcar', '/assets/NewWCar.png')
        this.load.image('rcar', '/assets/NewRCar.png')
        this.load.image('bcar', '/assets/NewBCar.png')
        this.load.image('gcar', '/assets/NewGCar.png')
        this.load.image('cone', '/assets/NewCone.png')
        this.load.image('barricade', '/assets/NewBarricade.png')
        this.load.image('background', '/assets/Street.png')
        this.load.spritesheet('explosion', '/assets/explosion3.png', {frameWidth: 125, frameHeight: 125, startFrame: 0, endFrame: 6});

    }

    create() {
        this.objectSpeed = -150;
        this.objectSpeedMax = -1000
        backgroundspeed = 2;
        this.bg = this.add.tileSprite(0,0, 960, 640, 'background').setOrigin(0,0)
        car = this.physics.add.sprite(32, game.config.height/2, 'wcar').setOrigin(0.5);
        car.setCollideWorldBounds(true);
        car.setImmovable();
        car.destroyed = false;
        car.setMaxVelocity(0, 400);
        car.setDragY(550)
        /*let cone01 = new Cone(this, 900, 150, -50)
        let cone02 = new Cone(this, 900, 325, -50)
        let cone03 = new Cone(this, 900, 500, -50)*/
        this.gameOver = false;
        this.coneGroup = this.add.group({
            runChildUpdate: true
        });
        this.barricadeGroup = this.add.group({
            runChildUpdate: true
        });
        this.carGroup = this.add.group({
            runChildUpdate: true
        });
        this.time.delayedCall(2000, () => {
            if (!car.destroyed) {
                this.addObjects();
            }
        })
        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: this.difficulty,
            callbackScope: this,
            loop: true
        })
        this.score = 0;
        this.tracker = this.add.text(800, 25, 'Time: ' + this.score, { fontFamily: 'After Hours', fontSize: 24 } )
        this.hs = this.add.text(400, 25, 'High Score: ' + highScore, { fontFamily: 'After Hours', fontSize: 24 })
        this.mode = this.add.text(50, 25, 'Mode: Easy', { fontFamily: 'After Hours', fontSize: 24 })
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6, first: 0 }),
            frameRate: 15
        });
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
            this.physics.world.collide(car, this.barricadeGroup, this.collision, null, this)
            this.physics.world.collide(car, this.carGroup, this.collision, null, this)
            this.physics.world.collide(car, this.coneGroup, this.collision, null, this)
        }
    }

    addObjects() {
        let randomSpeed = Phaser.Math.Between(0, 50);
        let numObj = Phaser.Math.Between(1, 3);
        if (numObj == 1) {
            let cone = new Cone(this, 900, Phaser.Math.RND.pick([150, 325, 500]), this.objectSpeed - randomSpeed);
            this.coneGroup.add(cone);
        }
        if (numObj == 2) {
            let barricade = new Barricade(this, 900, Phaser.Math.RND.pick([150, 325, 500]), this.objectSpeed - randomSpeed);
            //add beeping sound
            this.barricadeGroup.add(barricade);
        }
        if (numObj == 3) {
            let randomColor = Phaser.Math.Between(1, 4);
            if (randomColor == 1) {
                let car = new Car(this, 900, Phaser.Math.RND.pick([150, 325, 500]), 'wcar',this.objectSpeed - randomSpeed);
                this.carGroup.add(car);
            }
            if (randomColor == 2) {
                let car = new Car(this, 900, Phaser.Math.RND.pick([150, 325, 500]), 'rcar',this.objectSpeed - randomSpeed);
                this.carGroup.add(car);
            }
            if (randomColor == 3) {
                let car = new Car(this, 900, Phaser.Math.RND.pick([150, 325, 500]), 'bcar',this.objectSpeed - randomSpeed);
                this.carGroup.add(car);
            }
            if (randomColor == 4) {
                let car = new Car(this, 900, Phaser.Math.RND.pick([150, 325, 500]), 'gcar',this.objectSpeed - randomSpeed);
                this.carGroup.add(car);
            }
            
        }

    }

    collision() {
        car.destroyed = true;
        backgroundspeed = 0
        this.cameras.main.shake(2500, 0.0075);
        car.destroy();
        let boom = this.add.sprite(car.x, car.y - 40, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        if (highScore < this.score) {
            highScore = this.score;
        }
        
        this.time.delayedCall(1500, () => { this.scene.start('gameOverScene'); });
    }

    difficulty() {
        if (!car.destroyed) {
            this.score += 1
            this.tracker.setText('Time: ' + this.score)
                if (this.score % 5 == 0) {
                    if(this.objectSpeed >= this.objectSpeedMax) {
                        this.objectSpeed -= 35;
                    }
                }
                if (this.score > 20) {
                    this.mode.setText('Mode: Medium')
                }
                if (this.score > 40) {
                    this.mode.setText('Mode: Hard')
                }
            }
        }
}