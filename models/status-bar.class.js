class Statusbar extends DrawableObjects{

    x = 10;
    y = 0;

    IMAGES_ENERGY = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png'];
    percentage = 100;

    constructor(){
        super().loadImage('img/7.Marcadores/Barra/Marcador vida/azul/100_.png');
        this.loadImages(this.IMAGES_ENERGY);
        this.setWidthHeight(0.3);
    }

    // setPercentage(50);
    setPercentage(percentage){
        this.percentage = percentage;
        let imagePath = this.IMAGES_ENERGY[this.resolveImageIndex()]; 
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage >= 80){
            return 4;
        }else if(this.percentage >= 60){
            return 3;
        }else if(this.percentage >= 40){
            return 2;
        }else if(this.percentage >= 20){
            return 1;
        }else{
            return 0;
        }
    }
}