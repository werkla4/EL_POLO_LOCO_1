class Bottle extends ThrowableObjects {

    IMAGES_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png',
    ];
    IMAGES_ROTATION = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
    ];
    IMAGES_ONBOTTOM = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'
    ];
    IMAGES_BLANC = [
        'img/6.botella/1.Marcador.png'
    ];

    constructor(x, y) {
        // super();
        // if (art == 0) { this.loadImage(this.IMAGES_BLANC[0]); this.setWidthHeight(0.4);}
        // if (art == 1) { this.loadImage(this.IMAGES_ONBOTTOM[0]); this.setWidthHeight(0.2); }
        // if (art == 2) { this.loadImage(this.IMAGES_ONBOTTOM[1]); this.setWidthHeight(0.2); }

        super().loadImage(this.IMAGES_BLANC[0]);
        this.setWidthHeight(0.2);

        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_ONBOTTOM);
        this.loadImages(this.IMAGES_BLANC);
        this.x = x;
        this.y = y;
        
        this.sound = new Audio('audio/glasDestroy.mp3');
        this.sound.volume = 0.5
    }
}