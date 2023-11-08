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

    }

    create() {
        this.objectSpeed = -150;
        this.objectSpeedMax = -1000
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
    }
}