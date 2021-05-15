class Bottle extends ThrowableObjects{
    
    constructor(x, y){
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = x;
        this.y = y;
        this.setWidthHeight(0.4);
        this.sound = new Audio('audio/glasDestroy.mp3');
        this.sound.volume = 0.5
    }
}