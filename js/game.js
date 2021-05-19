let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    canvas.addEventListener("click", onClick, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("click", documentClick, false);
}

window.addEventListener("keydown", (e) => {
    world.startScreen.playMexicanMusicOnStartScreen();
    keyboard.onKeyDown(e);   
});
window.addEventListener("keyup", (e) => {
    keyboard.onKeyUp(e);
});

function onClick(e){
    world.fullscreen.onClick(); 
    world.clickNextLevel.onClick();
    world.startGameClick.onClick(); 
}

function mouseMove(e){
    world.clickNextLevel.setClickPosition(canvas, e);
    world.startGameClick.setClickPosition(canvas, e);
    world.fullscreen.setClickPosition(canvas, e);
    // set cursor
    if( world.clickNextLevel.mouseOverElement() || world.startGameClick.mouseOverElement() || world.fullscreen.mouseOverElement()  ){ 
        canvas.style.cursor = 'pointer';
    }else{
        canvas.style.cursor = 'default';
    }
}

function documentClick(e){
    world.startScreen.playMexicanMusicOnStartScreen();
}



