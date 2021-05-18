class Fullscreen extends ClickableObjects{
    x = 680;
    y = 440;

    constructor(){
        super();
        this.loadImage('img/Icons/fullscreen.png');
        this.setWidthHeight(0.15);        
    }

    hideElement(){
        this.setWidthHeight(0);  
    }

    isFullscreen(){
        return this.world.canvas.childNodes.length > 0;
    }

    showElement(){   
        this.setWidthHeight(0.15);      
    }

    update(){
        if(!this.isFullscreen()){
            this.showElement();
        }
        else{
            this.hideElement();
        }
    }

    activateFullscreen(){        
        this.world.canvas.requestFullscreen();        
    }

    onClick(){
        if(this.mouseOverElement()){
            this.activateFullscreen();
        }
    }
}