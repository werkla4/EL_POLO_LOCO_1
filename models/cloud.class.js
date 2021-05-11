class Cloud extends MovableObject{
    y = 20;
    width = 400;
    height = 200;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');

        this.x = Math.random()*800;
    }
}