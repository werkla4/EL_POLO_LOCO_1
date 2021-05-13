class MovableObject extends DrawableObjects {
    speed = 0.25;
    energy = 100;
    otherDirection = false;
    speed_y = 0;
    acceleration = 2.5;
    lastHit = 0;

    isAboveGround() {
        if(this instanceof ThrowableObjects){
            return true;
        }
        else{
            return this.y <= 200;
        }        
    }

    hit(){
        this.energy -= 0.5;
        if(this.energy <= 0){
            this.energy = 0;
        }
        else{
            this.lastHit = new Date().getTime();
        }
    }

    isDeath(){
        return this.energy == 0;
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed /= 1000; // difference in sec
        return timepassed < 1;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }
        }, 1000 / 25);
    }


    moveRight() {
        // walk right
        this.x += this.speed;
    }

    moveLeft() {
        // walk left
        this.x -= this.speed;
    }

    playAnimation(imgPaths) {
        // walk animation
        let i = this.currentImage % imgPaths.length;
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ...
        let path = imgPaths[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speed_y = 30;
    }

    // character.isColliding(chicken);
    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }
}