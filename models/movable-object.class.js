class MovableObject {
    x = 100;
    y = 290;
    height = 150;
    width = 100;
    speed = 0.25;
    img;
    imageCache = [];
    currentImage = 0;
    otherDirection = false;
    speed_y = 0;
    acceleration = 2.5;

    isAboveGround(){
        return this.y <= 200;
    }

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speed_y > 0){
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }            
        }, 1000 / 25);
    }

    // loadImages(['img/test1.png', 'img/test2.png', 'img/test3.png']);
    loadImages(paths) {
        paths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    // loadImage('img/test1.png');
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        // walk right
        this.x += this.speed;
    }

    moveLeft() {
        // walk left
        this.x -= this.speed;
    }

    setWidthHeight(factor) {
        this.height = this.img.height * factor;
        this.width = this.img.width * factor;
    }

    playAnimation(IMAGES_WALKING) {
        // walk animation
        let i = this.currentImage % IMAGES_WALKING.length;
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ...
        let path = IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump(){
        this.speed_y = 30;
    }
}