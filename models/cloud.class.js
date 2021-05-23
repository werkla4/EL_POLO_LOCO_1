class Cloud extends MovableObject {
    y = 20;
    width = 400;
    height = 200;

    IMAGES_CLOUDS = ['img/5.Fondo/Capas/4.nubes/1.png',
                    'img/5.Fondo/Capas/4.nubes/2.png'];

    constructor(x) {
        super();
        this.loadImages(this.IMAGES_CLOUDS);
        this.loadImage(this.IMAGES_CLOUDS[this.getRandomInt(2)]);
        this.animate();
        this.x = x;
    }

    animate() {
        let intervalId = setInterval(() => {
            this.moveLeft();
        }, 1000 / 20);
        this.intervalIds.push(intervalId);
    }


}