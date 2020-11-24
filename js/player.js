const theCat = {

    isJumping: false,

    position: {
        x:100,
        y:470,
    },

    velocity:{
        a:0,
        b:0,
    },


    controller: {
     
        left :false,
        right : false,
        up: false,

        keyListener: function(event){
            let keyState = (event.type == "keydown")? true: false;
            switch(event.keyCode) {
                case 37:// arrowLeft
                    console.log("here",keyState);
                    this.left = keyState;
                break;
                case 38: //arrowUp
                    this.up = keyState;
                break;
                case 39://arrowRight
                    this.right = keyState;
                break;    
                }
            }   
        },


    loadCat(){
        console.log(this.position);
        return loadImage('../imgs/nyanCat.png')
        .then (image => {
            const sprites = new SpriteSheet(image, 80,80);
            sprites.define('idle',0,0);
            sprites.draw('idle',context, this.position.x,this.position.y);
            console.log(this.controller.left);
    });
},


    loop(){
        if(this.controller.up && this.isJumping == false){
            this.velocity.b -=20;
            this.isJumping = true;
        }

        if(theCat.controller.left==true){
            this.velocity.a -= 1;
            console.log(this.velocity)
        }

        if(theCat.controller.right){
            this.velocity.a +=1;
        }

        theCat.position.y += 2;
        theCat.position.x += theCat.velocity.a;
        theCat.position.y += theCat.velocity.b;
        theCat.velocity.a*=0.9;
        theCat.velocity.b*=0.9; 


        if(theCat.position.y>490){
            this.isJumping = false;
            this.position.y = 490;
            this.velocity.b = 0;
        }

        if(theCat.position.x<10){
            this.position.x = 870;
        } else if(theCat.position.x>870){
            this.position.x = 10;
        }

        theCat.loadCat();
        window.requestAnimationFrame(theCat.loop);
    }     


}



  // event listeners
  function listen() {
    window.addEventListener("keydown", theCat.controller.keyListener);
    window.addEventListener("keyup", theCat.controller.keyListener);
    window.requestAnimationFrame(theCat.loop);
  }




