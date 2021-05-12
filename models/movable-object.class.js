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
        console.log("Moving right");
    }

    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        }, 1000/60);
    }

    setWidthHeight(factor) {
        this.height = this.img.height * factor;
        this.width = this.img.width * factor;
    }
}