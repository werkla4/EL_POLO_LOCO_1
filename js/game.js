let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
    keyboard.onKeyDown(e);
});
window.addEventListener("keyup", (e) => {
    keyboard.onKeyUp(e);
});