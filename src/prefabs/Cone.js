class Cone extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed) {
        super(scene, x, y, 'cone');
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(speed);
        this.setImmovable();
        this.spawnCone = true;

    }

    update() {
        
        /*if (this.checkCollision(this.parentScene.car, this)) {
            gameOver = true;
        }*/

        if (this.spawnCone && this.x < centerX && !car.destroyed) {
            this.parentScene.addObjects();
            this.spawnCone = false;
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