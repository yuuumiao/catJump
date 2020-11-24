import {loadImage, SpriteSheet} from './world.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


const loadBackground = function(){
loadImage('../imgs/tiles_map.png')
    .then (image => {
    const sprites = new SpriteSheet(image,70,70);
    sprites.define('sky',8,0);

     for(let x =0; x < 14; x++) {
           for (let y=0; y <8; y++) {
            sprites.draw('sky', context,x*70,y*70);
        }
    }

    sprites.define('grassGround',7,0);
    
    for(let x =0; x < 13; x++) {
        for (let y=7; y <8; y++) {
         sprites.draw('grassGround', context, x*70, y*70);
     }
 }

});
}





const theCat = {

    isJumping: false,

    position: {
        x:100,
        y:470,
    },

    velocity:{
        a:0,
        b:0,
    }
};   

const loadCat = function(){
    return loadImage('../imgs/nyanCat.png')
        .then (image => {
        const sprites = new SpriteSheet(image, 80,80);
        sprites.define('idle',0,0);
        sprites.draw('idle', context, theCat.position.x,theCat.position.y)
    })
}


 const controller = {
     
        left :false,
        right : false,
        up: false,

        keyListener: function(event){
            let keyState = (event.type == "keydown")? true: false;
            switch(event.keyCode) {
                case 37:// arrowLeft
                    console.log("here",keyState);
                    controller.left = keyState;
                break;
                case 38: //arrowUp
                    controller.up = keyState;
                break;
                case 39://arrowRight
                    controller.right = keyState;
                break;    
                }
            }   
        };



const loop = function(){
        if(controller.up && theCat.isJumping == false){
            theCat.velocity.b -=20;
            theCat.isJumping = true;
        }

        if(controller.left==true){
            theCat.velocity.a -= 1;
            console.log(theCat.velocity)
        }

        if(controller.right){
            theCat.velocity.a +=1;
        }

        theCat.position.y += 2;
        theCat.position.x += theCat.velocity.a;
        theCat.position.y += theCat.velocity.b;
        theCat.velocity.a*=0.9;
        theCat.velocity.b*=0.9; 


        if(theCat.position.y>490){
            theCat.isJumping = false;
            theCat.position.y = 490;
            theCat.velocity.b = 0;
        }

        if(theCat.position.x<10){
            theCat.position.x = 870;
        } else if(theCat.position.x>870){
            theCat.position.x = 10;
        }

        loadBackground();
        loadCat();
        window.requestAnimationFrame(loop);
    }     


  // event listeners
  function listen() {
    window.addEventListener("keydown", controller.keyListener);
    window.addEventListener("keyup", controller.keyListener);
    window.requestAnimationFrame(loop);
  }


  loadCat();
  listen();

