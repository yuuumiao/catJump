import {
    loadImage,
    SpriteSheet,
    loadBackground
} from './world.js';
import {
    canvas,
    context
} from './main.js';
import {
    collideCheck,
    loadBricks
} from './barriers.js';


export const theCat = {

    isJumping: false,


    position: {
        x: 100,
        y: 390
    },

    velocity: {
        a: 0,
        b: 0
    },

    dimensions: {
        width: 78,
        height: 48
    },

    borders: {
        top: 390,
        bottom: 454,
        left: 100,
        right: 178
    }

    // old: {
    //     x: 100,
    //     y: 390
    // }

};


export const setBoders = function (number) {
    theCat.position.y = (number + theCat.dimensions.height / 2);
}


export const updateBorders = function () {

    theCat.borders.top = theCat.position.y;
    theCat.borders.bottom = theCat.position.y + theCat.dimensions.height;
    theCat.borders.left = theCat.position.x;
    theCat.borders.right = theCat.position.x + theCat.dimensions.width;
}


export const loadCat = function () {
    return loadImage('../imgs/nyanCat.png')
        .then(image => {
            const sprites = new SpriteSheet(image, theCat.dimensions.width, theCat.dimensions.height);
            sprites.define('idle', 0, 0.32);
            sprites.draw('idle', context, theCat.position.x, theCat.position.y)
        })
}


export const controller = {

    left: false,
    right: false,
    up: false,
    down: false,

    keyListener: function (event) {
        let keyState = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            case 37: // arrowLeft
                console.log("here", keyState);
                controller.left = keyState;
                break;
            case 38: //arrowUp
                controller.up = keyState;
                break;
            case 39: //arrowRight
                controller.right = keyState;
                break;
            case 40: //arrowDown
                console.log("arrowDown");
                controller.down = keyState;
                break;

        }
    }
};


export const loop = function () {
    if (controller.up && theCat.isJumping == false) {
        theCat.velocity.b -= 20;
        theCat.isJumping = true;
    }

    if (controller.left == true) {
        theCat.velocity.a -= 1;
        console.log(theCat.velocity)
    }

    if (controller.right) {
        theCat.velocity.a += 1;
    }

    //this downward velocity is performing a bit strangely; need to be fixed
    if (controller.down && theCat.isJumping == false) {
        theCat.velocity.b += 10;
        theCat.isJumping = true;
    }

    theCat.position.y += 2;
    theCat.position.x += theCat.velocity.a;
    theCat.position.y += theCat.velocity.b;
    theCat.velocity.a *= 0.9;
    theCat.velocity.b *= 0.9;


    if (theCat.position.y > 430) {
        theCat.isJumping = false;
        theCat.position.y = 430;
        theCat.velocity.b = 0;
    }

    if (theCat.position.x < 10) {
        theCat.position.x = 870;
    } else if (theCat.position.x > 870) {
        theCat.position.x = 10;
    }
    updateBorders();
    loadBackground();
    loadBricks();
    collideCheck();
    loadCat();

    window.requestAnimationFrame(loop);
}