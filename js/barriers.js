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
// const addingmovingBricks = function (x1, y1, x2) {
//     const movBrick = {
//         position: {
//             x: x1,
//             y: y1
//         },
//         borders: {
//             top: y1,
//             bottom: y1 + 20,
//             left: x1,
//             right: x1 + 70,
//         },
//         velocity: {
//             x: 1,
//             y: 0
//         }

//     }
//     if (movBrick.borders.left < x1) {
//         movBrick.velocity.x += 2
//     }
//     if (movBrick.borders.right > x2) {
//         movBrick.velocity.x -= 2
//     }
//     movBrick.position.x += movBrick.velocity.x;
//     bricks.push(movBrick);
//     return bricks;
// }
// addingBricks(700, 400);
// addingBricks(70, 140);
// addingBricks(630, 400)
//console.log(bricks);

// level 1
//addingmovingBricks(500, 300, 400)
addingBricks(790, 400)
addingBricks(650, 300)
addingBricks(50, 250)
addingBricks(300, 50)
addingBricks(370, 50)
addingBricks(370, 50)
addingBricks(440, 50)
addingBricks(510, 50)
addingBricks(580, 50)
addingBricks(650, 50)
addingBricks(720, 50)
addingBricks(790, 50)
addingBricks(850, 50)
addingBricks(400, 150)
addingBricks(650, 200)
addingBricks(220, 120)



export const loadBricks = function () {
    loadImage('../imgs/tiles_map.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 70, 20);
            sprites.define('bricks', 5, 0);
            bricks.forEach((arr) => sprites.draw('bricks', context, arr.position.x, arr.position.y));

        })
}


export const collideCheck = function () {

    bricks.forEach((arr) => {
        //let arr = bricks[0];
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