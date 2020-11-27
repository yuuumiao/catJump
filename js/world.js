import {
    canvas,
    context
} from './main.js';



export class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }


    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;

        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x * this.width,
                y * this.height,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height);
        this.tiles.set(name, buffer)
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

}



export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}



export const loadBackground = function () {
    loadImage('./../imgs/tiles_map.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 70, 70);
            sprites.define('sky', 8, 0);

            for (let x = 0; x < 14; x++) {
                for (let y = 0; y < 8; y++) {
                    sprites.draw('sky', context, x * 70, y * 70);
                }
            }

            sprites.define('grassGround', 7, 0);

            for (let x = 0; x < 13; x++) {
                for (let y = 7; y < 8; y++) {
                    sprites.draw('grassGround', context, x * 70, y * 70);
                }
            }

        });
}