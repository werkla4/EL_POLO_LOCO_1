class ClickNextLevel extends ClickableObjects{
    x = 270;
    y = 400;
    width = 0;
    height = 0;
    txt = '';
    isShow = false;

    constructor(){
        super();      
    }

    hideElement(){
        this.width = 0;
        this.height = 0;   
        this.txt = '';
        this.isShow = false;
    }

    showElement(){   
        this.width = 200;
        this.height = 50;   
        this.txt = 'NEXT LEVEL';  
        this.draw(this.world.ctx); 
        this.isShow = true; 
    }

    update(){
        // this.hideElement();
    }

    onClick(){
        if(this.mouseOverElement()){
            this.world.loadNextLevel();
            this.world.stopwatch.start();
        }
    }

    draw(ctx){
        ctx = this.textFont(ctx);
        ctx.fillText(this.txt, this.x + 10, this.y + 40);   
    }
}