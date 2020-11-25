import {loadImage, SpriteSheet, loadBackground} from './world.js';
import {theCat, loadCat, controller, loop} from './player.js';
import {loadBricks} from './barriers.js';

export const canvas = document.getElementById('screen');
export const context = canvas.getContext('2d');

loadBricks();




  // event listeners
  function listen() {
    window.addEventListener("keydown", controller.keyListener);
    window.addEventListener("keyup", controller.keyListener);
    window.requestAnimationFrame(loop);
  }

  loadCat();
  listen();

