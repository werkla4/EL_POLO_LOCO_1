class Score extends DrawableObjects{
    charCodeZero = "0".charCodeAt(0);
    charCodeNine = "9".charCodeAt(0);
    ignoreList = ['Shift', 'Dead', 'CapsLock', 'Control', 'PageDown', 'PageUp', 'Home', 'End', 'Alt', 'AltGraph', 'ArrowRight',  'ArrowLeft',  'ArrowDown',  'ArrowUp'];
    inputName = false;
    lastInput;
    scoreNameInput = "";
    yourTime = 999.99;
    nameMaxLength = 17;
    greenTxtColor = '#59FF2B';
    redTxtColor = '#FF0000';
    greyTxtColor = '#808080';

    constructor(){
        super();
    }

    dim() {
        this.world.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }

    draw(ctx){
        this.inputName = true;
        this.dim();
        this.drawTxt(this.scoreNameInput, 30, 10, 470, this.redTxtColor);
        // this.drawYourTime();
        this.drawNewBestTime();
        this.drawBestScores();
    }

    drawYourTime(){
        this.drawTxt('YOUR TIME IS:', 30, 240, 50);
        this.drawTxt(this.yourTime + 's', 30, 300, 100);
    }

    drawNewBestTime(){
        this.drawTxt('CONGRATULATION: YOU ARE IN TOP 10!!', 30, 70, 50, this.greenTxtColor);
        this.drawTxt('(Please write your name and press ENTER)', 15, 200, 70, this.greyTxtColor);
        this.drawTxt(this.yourTime + 's', 30, 300, 115);
    }

    drawBestScores(){
        let txtSize = 15;
        let rowHeight = 25;
        let colWidth = 200;
        let startX = 210;
        let startY = 160;

        this.drawTxt('List of best times:', 20, startX, startY);
        this.drawTxt('_______________________', 20, startX, startY+3);

        let times = ['999.99s', '999.99s', '999.99s', '999.99s', '999.99s', '999.99s', '999.99s', '999.99s', '999.99s', '999.99s'];
        let names = ['Klaus Werner', 'Klaus Werner', 'Klaus Werner', 'Klaus Werner', 'Klaus Werner', 'Klaus Werner', 'Klaus Werner', 'Klaus Werner', 'Klaus Werner', 'Klaus Werner'];

        for(let i = 1; i <= 10; i++){
            // name
            this.drawTxt(names[i-1], txtSize, startX, startY + (i * rowHeight));
            // time
            this.drawTxt(times[i-1], txtSize, startX + colWidth, startY + (i * rowHeight));
        }
    }
    
    lastPressedKey(key) {
        this.lastInput = key;
    }

    deleteLastChar(){
        if(this.scoreNameInput.length > 0){
            this.scoreNameInput = this.scoreNameInput.substring(0, this.scoreNameInput.length - 1);
        }        
    }

    hideShiftDoubleEntry(){
        return (this.lastInput == this.lastInput.toUpperCase() && this.lastInput == this.scoreNameInput[this.scoreNameInput.length - 1] && !this.isDigitCode(this.lastInput));
    }

    nameToLong(){
        return this.scoreNameInput.length >= this.nameMaxLength;
    }

    writeScoreName() {
        if(!this.inputName){ return; }
        // new score, input your name:
        if (this.lastInput == 'Backspace') { this.deleteLastChar(); }
        else if (this.lastInput == 'Delete') { this.deleteLastChar(); }
        else if (this.ignoreInput() || this.nameToLong()) { }
        else if (this.hideShiftDoubleEntry()) { }  // in upper Case, it calls 2 times, ignore this
        else if(this.lastInput == 'Enter' || this.lastInput == 'Escape'){ 
            // save score
            console.log("SAVE SCORE");
        }
        else { this.scoreNameInput += this.lastInput; }
    }

    ignoreInput(){
        if(this.ignoreList.includes(this.lastInput)){ return true; }
        return false;
    }

    isDigitCode(n) {
        return (n >= this.charCodeZero && n <= this.charCodeNine);
    }
}