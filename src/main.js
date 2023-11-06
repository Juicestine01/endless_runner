// Justin Xu
// 
// An endless runner dodging game

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Title, Play, GameOver ]
}

let game = new Phaser.Game(config);
let cursors;
let highScore;
let newHighScore = false;
let backgroundspeed = 4;
let car = null;
let bg = null;
const carVelocity = 150;
