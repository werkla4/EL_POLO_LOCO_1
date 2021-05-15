class Cloud extends MovableObject {
    y = 20;
    width = 400;
    height = 200;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.animate();
        this.x = Math.random() * 800;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 20);
    }
}