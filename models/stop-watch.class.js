class Stopwatch extends DrawableObjects {
    
    times = [];
    startTime;
    ellapsedTime = 0;
    showTimeLeftBottom = true;    

    start() {
        this.startTime = new Date().getTime();
    }

    addEllapsedTime() {
        let ellapsedTime = new Date().getTime() - this.startTime;
        this.times.push(ellapsedTime);
        this.startTime = 0;
    }

    stopTime() {
        let ellapsedTime = new Date().getTime() - this.startTime;
        this.times.push(ellapsedTime);
        this.startTime = 0;
    }

    currentEllapsedTime() {
        // no recording
        if (this.startTime == 0) {
            return this.sumEllapsedTime();
        }
        // recording, gaming time
        let ellapsedTime = new Date().getTime() - this.startTime;
        return this.sumEllapsedTime() + ellapsedTime;
    }

    sumEllapsedTime() {
        let sum = 0;
        this.times.forEach((time) => {
            sum += time;
        });
        return sum;
    }

    round(time) {
        return Math.round(time / 10) / 100;
    }

    draw() {
        if (this.showTimeLeftBottom) {
            this.drawTxt(this.round(this.currentEllapsedTime()), 30, 10, 470);
        }
    }
}