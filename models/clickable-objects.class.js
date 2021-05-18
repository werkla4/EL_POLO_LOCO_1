class ClickableObjects extends DrawableObjects{
    mousePositionX; mousePositionY;
    x = 100;
    y = 100;
    width = 100;
    height = 100;
    isShow = false;

    setClickPosition(canvas, mouseClick){
        let canvasPositionX = canvas.getClientRects()[0].left;
        let canvasPositionY = canvas.getClientRects()[0].top;

        this.mousePositionX = mouseClick.clientX - canvasPositionX;
        this.mousePositionY = mouseClick.clientY - canvasPositionY;

        this.updateCurser();
    }

    mouseOverElement(){
        return this.mousePositionX >= this.x && this.mousePositionX <= this.x + this.width && this.mousePositionY >= this.y && this.mousePositionY <= this.y + this.height;
    }

    updateCurser(){
        if(this.mouseOverElement()){
            this.world.canvas.style.cursor = 'pointer';
        }
        else{
            this.world.canvas.style.cursor = 'default';
        }
    }

    onClick(){}
}