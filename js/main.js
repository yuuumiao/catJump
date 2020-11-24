import {loadImage, SpriteSheet} from './world.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


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


const theCat = {
    position: {
        x:100,
        y:470,
    },

    isJumping: false,

    loadCat(){
        return loadImage('../imgs/nyanCat.png')
        .then (image => {
            const sprites = new SpriteSheet(image, 80,80);
            sprites.define('idle',0,0);
            sprites.draw('idle',context, this.position.x,this.position.y);
    });
},
    reset(){
        this.position = {
            x: 100,
            y: 470
        };
    },

    jump(){
        console.log("jump");
        if (this.isJumping === true) return;
    
        this.isJumping = true;
        this.position.y -= 110;
        // this.element.classList.add("jump");

        setTimeout(() => {
           context.clearRect(this.position.x, this.position.y, 80, 80 );
          this.position.y += 110;
          this.isJumping = false;
          
          this.loadCat();
        //   this.element.classList.remove("jump");
        }, 500);
      },

    move(direction){
        console.log("move");
        context.clearRect(this.position.x, this.position.y, 80, 80 );


        if (direction == 'left') {
            this.position.x -= 4;
        } else if(direction == 'up'){
            console.log("up");
            theCat.jump();
        } else if(direction == 'down'){
            this.position.y+=4;
        } else if(direction == 'right'){
            this.position.x +=4;
        }

        theCat.loadCat();
        requestAnimationFrame(theCat.move);
    },
}



  function handleKeyUp(evt) {
    console.log(evt.code);
    if (evt.code === "Space") theCat.jump();
  }
  
  function handleKeyPress(evt) {
    if (evt.code === "KeyE") theCat.move('up');
    if (evt.code === "KeyS") {
        theCat.move('left');
    }
    if (evt.code === "KeyF") theCat.move('right');
  }
  
  // event listeners
  function listen() {
    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);
  }


theCat.loadCat();
listen();
