class Score extends DrawableObjects {
    charCodeZero = "0".charCodeAt(0);
    charCodeNine = "9".charCodeAt(0);
    ignoreList = ['Shift', 'Dead', 'CapsLock', 'Control', 'PageDown', 'PageUp', 'Home', 'End', 'Alt', 'AltGraph', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];
    inputName = false;
    lastInput;
    scoreNameInput = '';
    inputNameSaved = false;
    yourTime = 999.99;
    scoreListe;
    currentRankIndx = -1;
    nameMaxLength = 22;
    greenTxtColor = '#59FF2B';
    greyTxtColor = '#808080';
    show = false;
    bestTimeOfAll = 999.99;
    bestTimeLocal = 999.99;

    constructor() {
        super();
        this.initBestTimeLocal();
        this.initScoreListe();
    }

    initScoreListe() {
        let second = 0;
        let intervalId = setInterval(() => {
            second++;
            let scoreListe = this.getScoreListServer();
            if (scoreListe != null || second > 300) {
                clearInterval(intervalId);
                if (scoreListe != null) {
                    this.bestTimeOfAll = scoreListe.times[0];
                    console.log(this.bestTimeLocal);
                    console.log(this.bestTimeOfAll);
                }
            }
        }, 1000 / 60);
    }

    dim() {
        this.world.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }

    initBestTimeLocal() {
        let myBestTime = localStorage.getItem('myBestTime');
        // init
        if (myBestTime == null || myBestTime == undefined) {
            myBestTime = 999.99;
        }
        this.bestTimeLocal = myBestTime;
    }

    setBestTimeLocal() {
        let myBestTime = localStorage.getItem('myBestTime');
        console.log(myBestTime);
        // init
        if (myBestTime == null || myBestTime == undefined) {
            myBestTime = 999.99;
        }
        // update best time local
        if (this.yourTime < myBestTime) {
            localStorage.setItem('myBestTime', this.yourTime);
        }
    }

    setBestTimeOfAll() {
        this.bestTimeOfAll = this.scoreListe.times[0];
        if (this.bestTimeOfAll == null) {
            this.bestTimeOfAll = 999.99;
        }
    }

    defaultFormatScores() {
        let scores = {
            'names': ['nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody'],
            'times': [999.99, 999.99, 999.99, 999.99, 999.99, 999.99, 999.99, 999.99, 999.99, 999.99]
        }
        return scores;
    }

    resetScoreListe() {
        this.setScoreListServer(this.defaultFormatScores());
    }

    setScoreListServer(scoreListe) {
        let strg = JSON.stringify(scoreListe);
        backend.setItem('scoreListe', strg);
    }

    getScoreListServer() {
        let strg = backend.getItem('scoreListe');
        return JSON.parse(strg);
    }

    getBestTimesServer() {
        let scoreListe = this.getScoreListServer();
        if (scoreListe == null || scoreListe == undefined) {
            scoreListe = this.defaultFormatScores();
        }
        return scoreListe;
    }

    currentRanking(myTime, bestTimes) {
        for (let i = 0; i < bestTimes.length; i++) {
            if (myTime <= bestTimes[i]) {
                return i;   // entry your time in this indx :-)
            }
        }
        return -1;
    }

    setNewScore(myTime, scoreListe, rank) {
        if (rank != -1) {
            scoreListe.times.splice(rank, 0, myTime);
            scoreListe.times.splice(scoreListe.times.length - 1, 1);
            scoreListe.names.splice(rank, 0, 'nobody');
            scoreListe.names.splice(scoreListe.names.length - 1, 1);
        }
    }

    updateScoreName(scoreListe, rank, txt) {
        if (rank != -1) {
            scoreListe.names[rank] = txt;
        }
    }

    updateScoreList() {
        this.scoreListe = this.getBestTimesServer();
        this.currentRankIndx = this.currentRanking(this.yourTime, this.scoreListe.times);
        this.setNewScore(this.yourTime, this.scoreListe, this.currentRankIndx);
        this.setBestTimeLocal();
        // new score, enter your name
        if (this.currentRankIndx == -1) { this.inputName = false; }
        // no new score, dont enter your name
        else { this.inputName = true; this.scoreNameInput = '' }
    }

    checkNewLocalScore() {
        let myBestTime = this.getBestTimeLocal();
    }

    inTop10() {
        this.currentRankIndx = this.currentRanking(this.yourTime, this.scoreListe.times);
        if (this.currentRankIndx > -1) {
            return true;
        }
        else {
            return false;
        }
    }

    draw(ctx) {
        if (this.world.startScreen.isShow) {
            this.drawTxt('BEST TIME: ' + this.bestTimeOfAll, 25, 490, 26, this.greenTxtColor);
            this.drawTxt('YOUR BEST: ' + this.bestTimeLocal, 20, 510, 50, 'black');
        }

        if (!this.show) { return; }
        // show endscreen:
        this.dim();
        if (this.inTop10()) { this.drawNewBestTime(); }
        else { this.drawYourTime(); }

        this.drawBestScores();
        this.world.startGameClick.showElement();
    }

    drawYourTime() {
        this.drawTxt('YOUR TIME IS:', 30, 240, 50);
        this.drawTxt(this.yourTime + 's', 30, 320, 100, 'orange');
    }

    drawNewBestTime() {
        this.drawTxt('CONGRATULATION: YOU ARE IN TOP 10!!', 30, 70, 50, this.greenTxtColor);
        this.drawTxt('(Please write your name and press ENTER)', 15, 220, 70, this.greyTxtColor);
        this.drawTxt(this.yourTime + 's', 30, 320, 115, this.greenTxtColor);
    }

    drawRow(name, time, txtSize, startX, startY, rowHeight, colWidth, i, color) {
        // name
        this.drawTxt(name, txtSize, startX, startY + (i * rowHeight), color);
        // time
        this.drawTxt(time + 's', txtSize, startX + colWidth, startY + (i * rowHeight), color);
    }

    drawBestScores() {
        let txtSize = 15;
        let rowHeight = 25;
        let colWidth = 200;
        let startX = 240;
        let startY = 150;

        this.drawTxt('List of best times:', 20, startX, startY);
        this.drawTxt('_______________________', 20, startX, startY + 3);

        let times = this.scoreListe.times;
        let names = this.scoreListe.names;

        for (let i = 1; i <= 10; i++) {
            // write mode: in 
            if (this.inputName && this.currentRankIndx == i - 1) {
                this.drawRow(names[i - 1], times[i - 1], txtSize, startX, startY, rowHeight, colWidth, i, 'orange');
            }
            else if (this.inputNameSaved && this.currentRankIndx == i - 1) {
                this.drawRow(names[i - 1], times[i - 1], txtSize, startX, startY, rowHeight, colWidth, i, this.greenTxtColor);
            }
            else {
                this.drawRow(names[i - 1], times[i - 1], txtSize, startX, startY, rowHeight, colWidth, i, 'white');
            }
        }
    }

    lastPressedKey(key) {
        this.lastInput = key;
    }

    deleteLastChar() {
        if (this.scoreNameInput.length > 0) {
            this.scoreNameInput = this.scoreNameInput.substring(0, this.scoreNameInput.length - 1);
        }
    }

    hideShiftDoubleEntry() {
        return (this.lastInput == this.lastInput.toUpperCase() && this.lastInput == this.scoreNameInput[this.scoreNameInput.length - 1] && !this.isDigitCode(this.lastInput));
    }

    nameToLong() {
        return this.scoreNameInput.length >= this.nameMaxLength;
    }

    writeScoreName() {
        if (!this.inputName) { return; }
        // new score, input your name:
        if (this.lastInput == 'Backspace') { this.deleteLastChar(); }
        else if (this.lastInput == 'Delete') { this.deleteLastChar(); }
        else if (this.ignoreInput() || this.nameToLong()) { }
        else if (this.hideShiftDoubleEntry()) { }  // in upper Case, it calls 2 times, ignore this
        else if (this.lastInput == 'Enter' || this.lastInput == 'Escape') {
            // disable first Enter
            if (this.scoreNameInput != '') {
                // save score and disable input
                this.inputName = false;
                this.inputNameSaved = true;
                this.setScoreListServer(this.scoreListe);
            }
        }
        else { this.scoreNameInput += this.lastInput; }
        // update drawing
        this.updateScoreName(this.scoreListe, this.currentRankIndx, this.scoreNameInput);
    }

    ignoreInput() {
        if (this.ignoreList.includes(this.lastInput)) { return true; }
        return false;
    }

    isDigitCode(n) {
        return (n >= this.charCodeZero && n <= this.charCodeNine);
    }
}