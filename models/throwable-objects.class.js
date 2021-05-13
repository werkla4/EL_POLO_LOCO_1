class ThrowableObjects extends MovableObject{
    constructor(x, y){
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.setWidthHeight(0.4);
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw(){        
        this.speed_y = 25;
        this.applyGravity();
        setInterval(()=>{
            this.x += 7;
        }, 1000 / 60);
    }
}