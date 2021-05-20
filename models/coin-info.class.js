class CoinInfo extends DrawableObjects{

    x = -13;
    y = 80;
    nCoins = 0;

    IMAGES_COINS = ['img/8.Coin/Moneda1.png',
                    'img/8.Coin/Moneda2.png'];

    constructor(){
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.setWidthHeight(0.3);
    }

    draw(ctx){
        this.updateImgSize();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx = this.textFont(ctx);
        ctx.fillText(`${this.nCoins}`, 50, 133);   
    }

    addCoin(){
        this.nCoins++;
    }
}