class Barricade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed) {
        super(scene, x, y, 'barricade');
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(speed);
        this.setImmovable();
        this.spawnBarricade = true;

    }

    update() {
        
        /*if (this.checkCollision(this.parentScene.car, this)) {
            gameOver = true;
        }*/

        if (this.spawnBarricade && this.x < centerX && !car.destroyeds) {
            this.parentScene.addObjects();
            this.spawnBarricade = false;
        }


        if (this.x <= 15 - this.width) {
            this.destroy();
        }
    }

    /*checkCollision(player, object) {
        // simple AABB checking
        if (player.x < object.x + object.width && 
          player.x + player.width > object.x && 
          player.y < object.y + object.height &&
          player.height + player.y > object. y) {
          return true;
        } else {
          return false;
        }
      }*/
}