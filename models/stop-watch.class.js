class Stopwatch{
    times = [];
    startTime;
    ellapsedTime = 0;

    start(){
        this.startTime = new Date().getTime();
    }

    addEllapsedTime(){
        let ellapsedTime = new Date().getTime() - this.startTime;
        this.times.push(ellapsedTime);
    }

    sumEllapsedTime(){
        let sum = 0;
        this.times.forEach((time)=>{
            sum += time;
        });
        return sum;
    }
}