class Character extends MovableObject {

    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'];
    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-40.png'];
    IMAGES_DEAD = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'];
        IMAGES_HURT = [
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'];
        IMAGES_TIRED = [
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png'];
        IMAGES_SLEEP = [
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-11.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-12.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-13.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-14.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-15.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-16.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-17.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-18.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-19.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-20.png'];

    y = 100;
    speed = 10;
    walking_sound = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.setWidthHeight(0.2);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_TIRED);
        this.loadImages(this.IMAGES_SLEEP);
        this.animate();
        this.walking_sound.volume = 0.3;

        setInterval(() => {
            this.applyGravity(); 
        }, 1000 / 25);  
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
                this.otherDirection = false;
                this.isMovingTimestamp();
            }

            if (this.world.keyboard.LEFT && this.x > -600) {
                this.moveLeft();
                this.walking_sound.play();
                this.otherDirection = true;                
                this.isMovingTimestamp();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.isMovingTimestamp();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
            if (this.isDeath()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            else if (this.isTired()) {
               this.playAnimation(this.IMAGES_TIRED);
            }
            else if (this.isSleeping()) {
               this.playAnimation(this.IMAGES_SLEEP);
            }
        }, 1000 / 20);
    }
}