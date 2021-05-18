let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    canvas.addEventListener("click", onClick, false);
    canvas.addEventListener("mousemove", mouseMove, false);
}

window.addEventListener("keydown", (e) => {
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
    world.fullscreen.setClickPosition(canvas, e);
    world.clickNextLevel.setClickPosition(canvas, e);
    world.startGameClick.setClickPosition(canvas, e);
}

