class Keyboard{
    LEFT = false;
    RIGHT = false;
    DOWN = false;
    UP = false;
    SPACE = false;
    ESC = false;
    ENTER = false;

    onKeyDown(e){
        if(e.code == "ArrowDown"){
            this.DOWN = true;
        }
        else if(e.code == "ArrowUp"){
            this.UP = true;
        }
        else if(e.code == "ArrowLeft"){
            this.LEFT = true;
        }
        else if(e.code == "ArrowRight"){
            this.RIGHT = true;
        }
        else if(e.code == "Space"){
            this.SPACE = true;
        }
        else if(e.code == "KeyD"){
            this.KEY_D = true;
        }
        else if(e.code == "Escape"){
            this.ESC = true;
        }
        else if(e.code == "NumpadEnter" || e.code == "Enter"){
            this.ENTER = true;
        }
    }

    onKeyUp(e){        
        if(e.code == "ArrowDown"){
            this.DOWN = false;
        }
        else if(e.code == "ArrowUp"){
            this.UP = false;
        }
        else if(e.code == "ArrowLeft"){
            this.LEFT = false;
        }
        else if(e.code == "ArrowRight"){
            this.RIGHT = false;
        }
        else if(e.code == "Space"){
            this.SPACE = false;
        }
        else if(e.code == "KeyD"){
            this.KEY_D = false;
        }
        else if(e.code == "Escape"){
            this.ESC = false;
        }
        else if(e.code == "NumpadEnter" || e.code == "Enter"){
            this.ENTER = true;            
        }
    }
}