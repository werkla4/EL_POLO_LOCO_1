class World {
    canvas;
    ctx;

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];

    draw() {
        // clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        
        this.enemies.forEach(elm => {
            this.ctx.drawImage(elm.img, elm.x, elm.y, elm.width, elm.height);
        })

        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        })

        let self = this;
        requestAnimationFrame(()=>{
            self.draw()
        });
    }

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }
}