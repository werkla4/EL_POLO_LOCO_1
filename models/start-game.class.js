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
            console.log('please start game :-)');
        }
    }

    draw(ctx){
        ctx = this.textFont(ctx);
        ctx.fillText(this.txt, this.x + 10, this.y + 40);   
    }
}