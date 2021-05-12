class Keyboard{
    LEFT = false;
    RIGHT = false;
    DOWN = false;
    UP = false;
    SPACE = false;

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
    }
}