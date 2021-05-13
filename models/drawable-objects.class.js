class DrawableObjects{
    
    x = 100;
    y = 290;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;
    
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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }    

    setWidthHeight(factor) {
        this.height = this.img.height * factor;
        this.width = this.img.width * factor;
    }    

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            // draw rectangle 
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}