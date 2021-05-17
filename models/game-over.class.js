class GameOver extends DrawableObjects{
    IMAGE_GAMEOVER_TXT = 'img/9.Intro _ Outro Image/_Game over_ screen/3.Game over.png';
    sound = new Audio('audio/gameOver.mp3');
    isShow = false;
    isFullscreen = false;
    
    x = -100;
    y = -20;
    
    constructor(){
        super();
        this.loadImage(this.IMAGE_GAMEOVER_TXT);
        this.setWidthHeight(0);
    }

    show(){
        this.setWidthHeight(0.5);
        this.sound.play();
        this.isShow = true;
    }

    click(canvas, mouseClick){
        this.setClickPosition(canvas, mouseClick);
    }
}