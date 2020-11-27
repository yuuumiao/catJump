import {
    loadImage,
    SpriteSheet,
} from './world.js';

import {
    context,
    cancelAnimation,
} from './main.js';

import {
    theCat,
    loadCat,
    setBoders,
    controller,
    loop
} from './player.js';



let posx, posy, posright, posbottom, gh, gw;

const goal = function (l, t, w, h) {
    posx = l;
    posy = t;
    gw = w;
    gh = h;

    posright = l + w;
    posbottom = t + h;

}


goal(820, 22, 70, 40);

export const loadGoal = function () {
    return loadImage('./../imgs/nyanCat.png')
        .then(image => {
            const sprites = new SpriteSheet(image, gw, gh);
            sprites.define('rainbow', 3, 10.7);
            sprites.draw('rainbow', context, posx, posy);
        })
}


export const winCheck = function () {

    if (theCat.borders.right < posx || theCat.borders.left > posright ||
        theCat.borders.bottom < posy || theCat.borders.top > posbottom) {
        // console.log("--->");
        return false;
    } else winGame()
}


const winGame = function () {
    console.log("hey you win");
    context.font = '70px Ubuntu';
    context.fillText('You win', 200, 230);
    context.fillStyle = 'orange';
    cancelAnimation()
}