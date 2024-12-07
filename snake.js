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
        const isOutOfBounds = this.body[0].x < 0 || this.body[0].x > 53 || this.body[0].y < 0 || this.body[0].y > 53;
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

module.exports = Snake;