class Enemy {
    constructor(speed, y) {
        this.speed = speed; //default speed multiplier
        this.y = y;
        this.sprite = "images/enemy-bug.png";
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        if (this.x <= 550) {
            this.x += this.speed * dt;
        }
        else {
            this.x = -150 - Math.round(Math.random() * 500);
            this.y = 125 + (Math.ceil(Math.random() * 3) - 2) * 85;
        }
        //collision detection
        if (player.y === this.y) {
            if (player.x >= this.x - 50 && player.x <= this.x + 50) {
                alert("Oops! Bug got ya be careful next time!");
                player.x = 200;
                player.y = 380;
            }
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}



class Player {
    constructor() {
        this.x = 200;
        this.y = 380;
        this.sprite = "images/char-boy.png";
    }
    update() {
        if (this.y < 40) {
            //win state. reset position
            alert("Congratulation!! You've won!");
            this.x = 200;
            this.y = 380;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(allowedKeys) {
        switch (allowedKeys) {
            case "left":
                if (this.x >= 100) {
                    this.x -= 100;
                }
                break;
            case "right":
                if (this.x <= 300) {
                    this.x += 100;
                }
                break;
            case "up":
                if (this.y >= 40) {
                    this.y -= 85;
                }
                //Math intentionally allows water entry.
                //Final keystroke up renders winning reset
                //in Player.prototype.update
                break;
            case "down":
                if (this.y <= 295) {
                    this.y += 85;
                }
                break;
        }
    }
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];

//enemy requires speed, y loc
const createEnemies = () => {
  allEnemies[0] = new Enemy(125, 125);
  allEnemies[1] = new Enemy(300, 210);
  allEnemies[2] = new Enemy(500, 40);
  allEnemies[3] = new Enemy(125, 125);
  allEnemies[4] = new Enemy(300, 210);
};

createEnemies();

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", e =>{
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
