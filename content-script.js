class Snake {
    constructor() {
        this.body = [];
        this.body.push({x: 20, y: 3}); // the head of the snake
        this.direction = 0;
    }

    draw() {
        for (let b of this.body) {
            grid[b.y][b.x].setAttribute('data-level', 4);
        }
    }

    update(food) {
        this.hasTurned = false;
        this.lastX = this.body[this.body.length - 1].x
        this.lastY = this.body[this.body.length - 1].y;
        for (let i = this.body.length - 1; i >= 1; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        if (this.direction === 0) this.body[0].x++;
        if (this.direction === 1) this.body[0].y++;
        if (this.direction === 2) this.body[0].x--;
        if (this.direction === 3) this.body[0].y--;

        if (food.x === this.body[0].x && food.y === this.body[0].y) {
            food.spawn();
            this.body.push({x: this.lastX, y: this.lastY});
        }
    }

    up() {
        if (this.hasTurned) return;
        if (this.direction === 0 || this.direction === 2) {
            this.direction = 3;
            this.hasTurned = true;
        }
    }

    down() {
        if (this.hasTurned) return;
        if (this.direction === 0 || this.direction === 2) {
            this.direction = 1;
            this.hasTurned = true;
        }
    }

    left() {
        if (this.hasTurned) return;
        if (this.direction === 1 || this.direction === 3) {
            this.direction = 2
            this.hasTurned = true;
        }
    }

    right() {
        if (this.hasTurned) return;
        if (this.direction === 1 || this.direction === 3) {
            this.direction = 0;
            this.hasTurned = true;
        }
    }

    dead() {
        const isOutOfBounds = this.body[0].x < 0 || this.body[0].x > 52 || this.body[0].y < 0 || this.body[0].y > 6;
        if (isOutOfBounds) {
            return true;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) {
                return true;
            }
        }
        return false;
    }
}

class Food {
    constructor() {
        this.spawn();
    }

    spawn() {
        this.x = Math.floor(Math.random() * 53);
        this.y = Math.floor(Math.random() * 7);
    }

    draw() {
        grid[this.y][this.x].setAttribute('data-level', 2);
    }
}

let grid = [];
let snake = new Snake();

setTimeout(() => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
            snake.up();
            event.preventDefault();
        } else if (event.key === "ArrowDown") {
            snake.down();
            event.preventDefault();
        } else if (event.key === "ArrowLeft") {
            snake.left();
            event.preventDefault();
        } else if (event.key === "ArrowRight") {
            snake.right();
            event.preventDefault();
        }
    });
    const nodes = document.querySelectorAll('[data-date]');
    if (nodes.length > 0) {
        startGame(nodes);
    }
}, 3000)


function startGame(nodes) {
    grid = createGrid(nodes);
    food = new Food();
    snake = new Snake();
    let gameLoop = setInterval(() => {
        clear(nodes);
        snake.update(food);
        if (snake.dead()) {
            clearInterval(gameLoop);
            startGame(nodes);
            return;
        }
        food.draw();
        snake.draw();

    }, 300);
}

function clear(nodes) {
    nodes.forEach(node => {
        node.setAttribute('data-level', 0);
    });
}

function createGrid(nodes) {
    let row = -1;
    let grid = [];
    for (let i = 0; i < nodes.length; i++) {
        if (i % 53 == 0) {
            row++;
            grid[row] = [];
        }

        grid[row].push(nodes[i]);
    }
    return grid;
}
