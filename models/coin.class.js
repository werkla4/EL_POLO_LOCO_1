class Coin extends MovableObject {

    x; y; 
    sound = new Audio('audio/collectCoin.mp3');

    IMAGES_COINS = ['img/8.Coin/Moneda1.png',
                    'img/8.Coin/Moneda2.png'];

    constructor(x, y) {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.setWidthHeight(0.4);

        this.x = x;
        this.y = y;
        this.sound.volume = 0.2;

        this.animate();
    }

    animate(){
        setInterval(()=>{
            this.playAnimation(this.IMAGES_COINS, 1);
        }, 500);
    }

    playSound(){
        this.sound.play();
    }
}