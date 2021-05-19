class StartScreen extends DrawableObjects{
    IMAGE_STARTSCREEN = 'img/9.Intro _ Outro Image/Start Screen/Opción2.png';
    sound = new Audio('audio/mexicanMusic.mp3');
    
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    txt0 = 'LEFT   => WALK LEFT';
    txt1 = 'RIGHT => WALK RIGHT';
    txt2 = 'SPACE => JUMP';
    txt3 = 'ENTER => START GAME / NEXT LEVEL';
    txtMexicanMusic = 'Press any key for Mexican-Music';
    isShow = false; 
    musicOn = false;   
    
    constructor(){
        super();
        this.loadImage(this.IMAGE_STARTSCREEN);
        this.sound.volume = 0.1;
    }

    waitingForStartingGame(){
        if(this.world.keyboard.ENTER){
            this.hide();
        }
    }

    show(){        
        this.isShow = true;
    }

    playSound(){
        this.sound.play();
        this.musicOn = true;
        this.txtMexicanMusic = 'Mexican-Music: ON';
    }

    pauseSound(){
        this.sound.pause();
        this.musicOn = false;
        this.txtMexicanMusic = 'Mexican-Music: OFF';
    }

    hide(){
        this.sound.pause();
        this.isShow = false;
        this.musicOn = false;
        this.txtMexicanMusic = 'Press any key for Mexican-Music';
    }

    update(){}

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx = this.textFontSmall(ctx);
        ctx.fillText(this.txt0, 10, 20); 
        ctx.fillText(this.txt1, 10, 40);  
        ctx.fillText(this.txt2, 10, 60); 
        ctx.fillText(this.txt3, 10, 80);  
        ctx.fillText(this.txtMexicanMusic, 10, 470);   
        this.world.startGameClick.showElement();
    }

    playMexicanMusicOnStartScreen(){
        if(this.isShow){
            if(this.musicOn){
                this.pauseSound();
            }
            else{
                this.playSound();
            }        
        }
    }
}