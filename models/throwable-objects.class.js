class ThrowableObjects extends MovableObject {

    throwOtherDirection = false;
    isBroken = false;
    sound;
    throw_step_x = 0;

    throw(characterX, characterY, world) {
        if (this.isThrowing) { return; }

        this.world = world;
        this.speed_y = 30;
        this.throw_step_x = 7;

        this.positionThrowObject(world);

        this.throwOtherDirection = world.character.otherDirection;
        this.isThrowing = true;
    }

    playSound(){
        this.sound.play();
        this.deleteModus = true;
    }

    positionThrowObject(world) {
        if (world.character.otherDirection) {
            this.x = world.character.x - 15;
            this.y = world.character.y + 100;
        } else {
            this.x = world.character.x + 70;
            this.y = world.character.y + 100;
        }
    }

    checkHitGround(){
        if(this.y > 380){
            this.isBroken = true;
        }       
    }

    update() {
        if (this.isAboveGround() && !this.throwOtherDirection) {
            this.x += this.throw_step_x;
        }
        if (this.isAboveGround() && this.throwOtherDirection) {
            this.x -= this.throw_step_x;
        }
        this.applyGravity();

        this.checkHitGround();
    }
}