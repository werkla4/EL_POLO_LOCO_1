class BottleInfo extends DrawableObjects {
    x = 0;
    y = 40;
    nBottles = 0;

    constructor() {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.setWidthHeight(0.4);
    }

    setBottles(nBottles){
        this.nBottles = nBottles;
    }

    draw(ctx){
        this.updateImgSize();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx = this.textFont(ctx);
        ctx.fillText(`${this.nBottles}`, 50, 80);   
    }
}