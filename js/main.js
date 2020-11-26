import {
    loadImage,
    SpriteSheet,
    loadBackground
} from './world.js';
import {
    loadCat,
    controller,
    loop
} from './player.js';
import {
    loadBricks
} from './barriers.js';

export const canvas = document.getElementById('screen');
export const context = canvas.getContext('2d');

const startBtn = document.getElementById('startBtn');
const startPic = document.getElementById('startPic');


let isGameOn = false;


function handleClick() {
    console.log("clicked");
    isGameOn = !isGameOn;
    console.log(isGameOn)

    if (isGameOn) {
        canvas.style.display = 'block';
        startPic.style.display = 'none';
        startBtn.textContent = 'PRESS TO EXIT';
        gameStart();
    } else {
        console.log('function');
        canvas.style.display = 'none';
        startPic.style.display = 'block';
        startBtn.textContent = 'PRESS TO START';
        cancelAnimation();
    }
}


// event listeners
function listen() {
    window.addEventListener("keydown", controller.keyListener);
    window.addEventListener("keyup", controller.keyListener);
    window.requestAnimationFrame(loop);
}


function gameStart() {
    loadBackground();
    loadBricks();
    loadCat();
    listen();
}



function cancelAnimation() {
    window.cancelAnimationFrame(loop);
}

function gameOver() {

    // obstacles.reset();
    // player.reset();
    // tick = 0;
    // time = 0;
    // window.cancelAnimationFrame(_FRAMEID);
    // world.end();
}

startBtn.addEventListener("click", handleClick);