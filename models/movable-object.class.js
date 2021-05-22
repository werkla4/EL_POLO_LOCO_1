class MovableObject extends DrawableObjects {
    speed = 0.25;
    energy = 100;
    otherDirection = false;
    speed_y = 0;
    acceleration = 2.5;
    lastHit = 0;
    world;
    lastMoveTime = new Date().getTime();
    slowImageIndx = 0;
    chickenSound = new Audio('audio/chickenSound.mp3');
    breakNeckSound = new Audio('audio/breakNeck.mp3');

    playBreakNeckSound() {
        this.breakNeckSound.play();
    }

    pauseBreakNeckSound() {
        this.breakNeckSound.pause();
    }

    playChickenSound() {
        this.chickenSound.play();
    }

    pauseChickenSound() {
        this.chickenSound.pause();
    }

    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return true;
        }
        else {
            return this.y <= 200;
        }
    }

    isMovingTimestamp() {
        this.lastMoveTime = new Date().getTime();
    }

    isTired() {
        return (new Date().getTime() - this.lastMoveTime) / 1000 < 2;
    }

    isSleeping() {
        return (new Date().getTime() - this.lastMoveTime) / 1000 >= 2;
    }

    hit() {
        this.energy -= 0.5;
        if (this.energy <= 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isDeath() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed /= 1000; // difference in sec
        return timepassed < 1;
    }

    applyGravity() {
        if (this.isAboveGround() || this.speed_y > 0) {
            this.y -= this.speed_y;
            this.speed_y -= this.acceleration;
        }
    }

    moveRight() {
        // walk right
        this.x += this.speed;
    }

    moveLeft() {
        // walk left
        this.x -= this.speed;
    }

    playAnimation(imgPaths, everyNth) {
        this.slowImageIndx++;
        if (this.slowImageIndx % everyNth == 0) {
            // walk animation
            let i = this.currentImage % imgPaths.length;
            // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ...
            let path = imgPaths[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    jump() {
        this.speed_y = 30;
        this.currentImage = 0;
    }

    // character.isColliding(chicken);
    isColliding(mo) {
        // is death
        if (mo.isDeath()) { return false; }

        let thisX = this.x;
        let thisY = this.y;
        let thisWidth = this.width;
        let thisHeight = this.height;

        let otherX = mo.x;
        let otherY = mo.y;
        let otherWidth = mo.width;
        let otherHeight = mo.height;

        if (this instanceof Character) {
            thisY = thisY + (thisHeight / 2);
            thisHeight /= 2;
        }
        if (mo instanceof Coin) {
            otherY = otherY + (otherHeight / 3) + 10;
            otherX = otherX + (otherWidth / 3);
            otherHeight /= 3;
            otherWidth /= 3;
        }

        if (mo instanceof Endboss) {
            // is alive cand can hit
            return this.collision1(thisX, thisY, thisWidth, thisHeight, otherX, otherY, otherHeight)
                || this.collision2(thisX, thisY, thisWidth, thisHeight, otherX, otherY, otherWidth)
                || this.thisBetweenMo(thisX, thisY, otherX, otherY, otherWidth);
        }
        else{
            return this.collision1(thisX, thisY, thisWidth, thisHeight, otherX, otherY, otherHeight) 
                || this.collision2(thisX, thisY, thisWidth, thisHeight, otherX, otherY,otherWidth)
        }
    }

    collision1(thisX, thisY, thisWidth, thisHeight, otherX, otherY, otherHeight){
           return ( thisX + thisWidth > otherX &&
                    thisY + thisHeight > otherY &&
                    thisX < otherX &&
                    thisY < otherY + otherHeight);
    }

    collision2(thisX, thisY, thisWidth, thisHeight, otherX, otherY, otherWidth){
           return ( thisX < otherX + otherWidth &&
                    thisX + thisWidth > otherX &&
                    thisY < otherY &&
                    thisY + thisHeight > otherY);
    }

    thisBetweenMo(thisX, thisY, otherX, otherY, otherWidth) {
        return thisX > otherX &&
            thisX < otherX + otherWidth &&
            thisY > otherY;
    }
}