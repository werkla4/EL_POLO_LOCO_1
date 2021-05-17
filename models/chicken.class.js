class Chicken extends MovableObject {

    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'];
    IMAGE_DEAD = ['img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'];
    y = 360;

    constructor(x) {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.setWidthHeight(0.3);

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
            if(this.energy == 0){
                this.loadImage(this.IMAGE_DEAD[0]);
            }
            else{
                this.playAnimation(this.IMAGES_WALKING, 2);
            }            
        }, 100);
    }
}