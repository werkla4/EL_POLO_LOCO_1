class StartGame extends ClickableObjects{
    x = 270;
    y = 400;
    width = 0;
    height = 0;
    txt = '';

    constructor(){
        super();      
    }

    hideElement(){
        this.width = 0;
        this.height = 0;   
        this.txt = '';
    }

    showElement(){   
        this.width = 200;
        this.height = 50;   
        this.txt = 'START GAME';  
        this.draw(this.world.ctx);  
    }

    update(){
        // show and hide here
    }

    onClick(){
        if(this.mouseOverElement()){
            if(this.world.startScreen.isShow){
                this.world.startScreen.hide();
                this.hideElement();
                this.world.stopwatch.start();
            }            

            if(this.world.gameOver.isShow){
                window.location.href = '/index.html';
            }
        }
    }

    draw(ctx){
        ctx = this.textFont(ctx);
        ctx.fillText(this.txt, this.x + 10, this.y + 40);   
    }
}