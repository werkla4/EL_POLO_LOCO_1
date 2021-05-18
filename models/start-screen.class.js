class StartScreen extends DrawableObjects{
    IMAGE_STARTSCREEN = 'img/9.Intro _ Outro Image/Start Screen/Opción2.png';
    sound = new Audio('audio/mexicanMusic.mp3');
    
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    
    constructor(){
        super();
        this.loadImage(this.IMAGE_STARTSCREEN);
        this.sound.volume = 0.1;
    }

    show(){
        this.sound.play();
        this.isShow = true;
    }

    update(){}
}