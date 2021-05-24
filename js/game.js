let canvas;
let world;
let keyboard = new Keyboard();

async function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    canvas.addEventListener("click", onClick, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("click", documentClick, false);
    setURL('http://klaus-werner.developerakademie.com/EL_POLO_LOCO_1/small_backend');
    await downloadFromServer();
}

window.addEventListener("keydown", (e) => {
    keyboard.onKeyDown(e);   
    world.startScreen.playMexicanMusicOnStartScreen();
    world.pressedEnterNextLevel();
    world.score.lastPressedKey(e.key);
});
window.addEventListener("keyup", (e) => {
    keyboard.onKeyUp(e);
    world.score.writeScoreName();
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



