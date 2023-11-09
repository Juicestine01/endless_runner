// Justin Xu
// Swimming Thru Traffic
// Hours Spent: 25
//Creative Tilt: I am proud of randomly spawning in from the 3 obtacles in 3 different locations and 
// I am proud of the art because I did it all myself in pixilart.com
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
    scene: [ Title, Play, GameOver, Credits ]
}

let game = new Phaser.Game(config);
let cursors;
let highScore = 0;
let backgroundspeed = 4;
let car = null;
let bg = null;
const carVelocity = 150;
let centerX = game.config.width/2
