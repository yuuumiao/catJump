import {
    loadImage,
    SpriteSheet,
    loadBackground
} from './world.js';

import {
    theCat,
    loadCat,
    setBoders,
    controller,
    loop
} from './player.js';

import {
    canvas,
    context
} from './main.js';





export const bricks = [];

const addingBricks = function (i, j) {
    const oneBrick = {
        position: {
            x: i,
            y: j
        },
        borders: {
            top: j,
            bottom: j + 20,
            left: i,
            right: i + 70,
        }
    }
    bricks.push(oneBrick);
    return bricks;
}

addingBricks(700, 350);
addingBricks(70, 140);
console.log(bricks);





export const loadBricks = function () {
    loadImage('../imgs/tiles_map.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 70, 20);
            sprites.define('bricks', 5, 0);
            bricks.forEach((arr) => sprites.draw('bricks', context, arr.position.x, arr.position.y));

        })
}


export const collideCheck = function () {
    let collideState;
    bricks.forEach((arr) => {
        console.log(arr);
        if (
            theCat.borders.right < arr.borders.left || theCat.borders.left > arr.borders.right ||
            theCat.borders.bottom < arr.borders.top || theCat.borders.top > arr.borders.bottom)


            collideState = false;

        else {
            // console.log("thecatborder", theCatBorders)
            collideState = true;
            // console.log(theCatBorders.right, arr.borders.left);
            setBoders(arr.position.y);
            // theCat.position.y = (arr.position.y + 64);
            //need to change the 64 to the object height later
        }
        // console.log(collideState);
    })

}