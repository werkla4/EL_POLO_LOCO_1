class DrawableObjects {

    x = 100;
    y = 290;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;

    imgSize = 1;
    imgSizeSet = true;
    world;

    // loadImages(['img/test1.png', 'img/test2.png', 'img/test3.png']);
    loadImages(paths) {
        paths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    } 
    
    drawTxt(txt, size, posX, posY, color = 'white'){
        this.world.ctx.font = `${size}px Arial`;
        this.world.ctx.fillStyle = color;
        this.world.ctx.fillText(txt, posX, posY);  
    }

    textFont(ctx){
        ctx.font = "30px Arial white";
        ctx.textBaseline = "center";
        ctx.fillStyle = "white";
        return ctx;
    }   

    textFontSmall(ctx){
        ctx.font = "15px Arial white";
        ctx.textBaseline = "center";
        ctx.fillStyle = "white";
        return ctx;
    }

    // loadImage('img/test1.png');
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    draw(ctx) {
        this.updateImgSize();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    updateImgSize() {
        if (this.img.width != 0 && !this.imgSizeSet) {
            this.height = this.img.height * this.imgSize;
            this.width = this.img.width * this.imgSize;
            this.imgSizeSet = true;
        }
    }

    setWidthHeight(factor) {
        this.imgSize = factor;
        this.imgSizeSet = false;
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