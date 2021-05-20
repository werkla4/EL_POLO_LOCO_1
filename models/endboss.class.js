class Endboss extends MovableObject {
    IMAGES_WALKING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png'];
    IMAGES_ALERT = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'];
    IMAGES_ATTACK = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png'];
    IMAGES_VERY_DAMAGED = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png'];
    IMAGES_DEATH = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'];
    
    isWalkingToCharacter = false;
    isReadyForFight = false;
    nHits  = 0;
    characterX_StartWalkAnimation = 2500;
    

    animate() {
        setInterval(() => {
            if(this.isWalkingToCharacter){
                this.playAnimation(this.IMAGES_WALKING, 1);
            }  
            else if(this.energy == 0){
                this.y += 20
                this.playAnimation(this.IMAGES_DEATH, 5);
            }  
            else if(this.nHits == 1){
                this.playAnimation(this.IMAGES_ATTACK, 1);
            }   
            else if(this.nHits == 2){
                this.playAnimation(this.IMAGES_VERY_DAMAGED, 1);
            }   
            else if(this.isReadyForFight){
                this.playAnimation(this.IMAGES_ALERT, 1);
            }            
        }, 1000 / 5);
    }

    update() {
        setInterval(() => {
            if(this.world.character.isDeath()){
                this.pauseChickenSound();
            }
            else{
                this.walkToCharacter();
            }
        }, 1000 / 60);
    }

    giveBirth(){
        let kindOfChicken = Math.random() * 2;
        // brown chicken
        if(kindOfChicken <= 1){
            this.world.level.enemies.push(new Chicken(this.x + this.width / 2));
        }
        else{
            this.world.level.enemies.push(new YellowChicken(this.x + this.width / 2));
        }
    }

    hit(){
        this.nHits++;
        this.energy -= 25;
        if(this.energy <= 0){ this.energy = 0; }
        if(this.nHits == 1){
            this.playChickenSound();
            setTimeout(()=>{
                this.giveBirth();
            }, 2000 * Math.random());
        }
        if(this.nHits == 2){
            setTimeout(()=>{
                this.giveBirth();
            }, 2000 * Math.random());
            setTimeout(()=>{
                this.giveBirth();
            }, 2000 * Math.random());
        }
        if(this.nHits == 3){
            setTimeout(()=>{
                this.giveBirth();
            }, 2000 * Math.random());
            setTimeout(()=>{
                this.giveBirth();
            }, 2000 * Math.random());
            setTimeout(()=>{
                this.giveBirth();
            }, 2000 * Math.random());
        }
    }

    walkToCharacter(){
        if(this.world.character.x >= this.characterX_StartWalkAnimation && !this.isWalkingToCharacter){
            this.isWalkingToCharacter = true;
        }
        if(this.isWalkingToCharacter){
            this.moveLeft();
            if(this.x <= 2400){
                this.isReadyForFight = true;
                this.isWalkingToCharacter = false;
                this.x = 2400
            }
        }
    }

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_VERY_DAMAGED);
        this.loadImages(this.IMAGES_DEATH);
        this.setWidthHeight(0.4);

        this.x = 3000;
        this.y = -20;
        this.speed = 4;
    }
}