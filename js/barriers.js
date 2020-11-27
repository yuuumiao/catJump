import {
    loadImage,
    SpriteSheet,
} from './world.js';

import {
    theCat,
    loadCat,
    setBoders,
    controller,
    loop
} from './player.js';

import {
    context
} from './main.js';



export const bricks = [];
export const movings = [];


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
    // console.log("original add");
    bricks.push(oneBrick);
    return bricks;
}


const addingMovingBricks = function (i, j) {

    const mBrick = {

        xpos: i,
        ypos: j,
        ti: 0, // a timer
        bt: j,
        bb: j + 20,
        bl: i,
        br: i + 70,
        vx: 0,
    };

    movings.push(mBrick);
    return mBrick;
}

addingMovingBricks(500, 120);
//addingMovingBricks(400, 200);
console.log(movings);

function path(one) {
    one.ti += (3.14 / 100);
    one.vx = Math.cos(one.ti) * 9;
    one.xpos += one.vx;
    one.bt = one.ypos
    one.bb = one.ypos + 20;
    one.bl = one.xpos;
    one.br = one.xpos + 70;
};

export function updateBricks() {
    movings.forEach((arr) => path(arr));
}



// level 1
const arrBricksLevel1 = [
    [790, 400],
    [650, 300],
    [50, 250],
    [300, 50],
    [370, 50],
    [440, 50],
    [510, 50],
    [580, 50],
    [650, 50],
    [720, 50],
    [790, 50],
    [850, 50],
    //  [400, 150],
    [650, 200],
    //[220, 120],

];

function loadLevels(level) {
    level.forEach((arr) => {
        console.log("adding");
        addingBricks(arr[0], arr[1]);
    });
}

loadLevels(arrBricksLevel1);


export const loadBricks = function () {
    loadImage('./../imgs/tiles_map.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 70, 20);
            sprites.define('bricks', 5, 0);
            bricks.forEach((arr) => sprites.draw('bricks', context, arr.position.x, arr.position.y));
            sprites.define('mBrick', 4, 2);
            movings.forEach((a) => {
                sprites.draw('mBrick', context, a.xpos, a.ypos)
            });
        })
}


export const collideCheck = function () {

    bricks.forEach((arr) => {
        // console.log(arr);
        if (theCat.borders.right < arr.borders.left || theCat.borders.left > arr.borders.right ||
            theCat.borders.bottom < arr.borders.top || theCat.borders.top > arr.borders.bottom) {
            console.log("--->");
            return false;
        } else {
            if (theCat.borders.bottom > arr.borders.top && theCat.borders.bottom < arr.borders.bottom) {
                console.log("collide top")
                setBoders.setBottom(arr.borders.top);
                theCat.velocity.b = 0;
                theCat.isJumping = false
            }
            if (theCat.borders.top > arr.borders.top && theCat.borders.top < (arr.borders.bottom - 7)) {
                console.log("collide bot")
                setBoders.setTop(arr.borders.bottom - 7);
                theCat.velocity.b = 0;
            }
            if (theCat.borders.top < arr.borders.top && theCat.borders.bottom > arr.borders.bottom) {
                if (theCat.borders.right > arr.borders.left && theCat.borders.right < arr.borders.right) {
                    console.log("collide left")
                    setBoders.setRight(arr.borders.left)
                }

                if (theCat.borders.left < arr.borders.right && theCat.borders.left > arr.borders.left) {
                    console.log("collide right")
                    setBoders.setLeft(arr.borders.right)
                }
            }
        }
    })
}


export const collideCheckMoving = function () {
    movings.forEach((arr) => {
        if (theCat.borders.right < arr.bl || theCat.borders.left > arr.br ||
            theCat.borders.bottom < arr.bt || theCat.borders.top > arr.bb) {
            // console.log("--->");
            return false;
        } else {
            if (theCat.borders.bottom > arr.bt && theCat.borders.bottom < arr.bb) {
                console.log("collide top")
                setBoders.setBottom(arr.bt);
                theCat.velocity.b = 0;
                theCat.velocity.a = arr.vx;
                theCat.isJumping = false
            }
            if (theCat.borders.top > arr.bt && theCat.borders.top < (arr.bb - 7)) {
                console.log("collide bot")
                setBoders.setTop(arr.bb - 7);
                theCat.velocity.b = 0;
            }
            if (theCat.borders.top < arr.bt && theCat.borders.bottom > arr.bb) {
                if (theCat.borders.right > arr.bl && theCat.borders.right < arr.br) {
                    console.log("collide left")
                    setBoders.setRight(arr.bl)
                }

                if (theCat.borders.left < arr.br && theCat.borders.left > arr.bl) {
                    console.log("collide right")
                    setBoders.setLeft(arr.br)
                }
            }
        }
    })
}