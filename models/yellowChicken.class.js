class YellowChicken extends MovableObject {

    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png'];
    IMAGE_DEAD = ['img/3.Secuencias_Enemy_básico/Versión_pollito/4.Muerte.png'];
    y = 390;

    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.setWidthHeight(0.23);

        this.x = x;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    hit(){
        this.energy = 0;
        this.speed = 0;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDeath()){
                this.loadImage(this.IMAGE_DEAD[0]);
            }
            else{
                this.playAnimation(this.IMAGES_WALKING);
            }            
        }, 100);
    }
}