class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    character = new Character();
    level = level1;
    statusBar = new Statusbar();
    gameOver = new GameOver();
    startScreen = new StartScreen();
    clickNextLevel = new ClickNextLevel();
    startGameClick = new StartGame();
    fullscreen = new Fullscreen();
    bottleInfo = new BottleInfo();
    throwableObjects = [];
    canThrow = true;
    lastThrowTime;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.runUpdates();
        this.draw();
    }

    runUpdates() {
        this.lastThrowTime = new Date().getTime() - 2001; // init throwTime

        let interval = setInterval(() => {
            if(this.character.isDeath()){ clearInterval(interval); return; } // stop interval
            this.checkCollision();
            this.checkThrowableObjects();
            this.setCanThrow();
            this.updateBottleInfo();
            this.fullscreen.update();
            this.clickNextLevel.update();
            this.startGameClick.update();
            this.startScreen.update();
        }, 1000 / 60);
    }

    updateBottleInfo(){
        if(this.throwableObjects.length > 0 && this.throwableObjects[0].isThrowing){
            this.bottleInfo.setBottles(this.throwableObjects.length - 1);
        }
        else{
            this.bottleInfo.setBottles(this.throwableObjects.length);
        }
    }

    setCanThrow(){
        let dif = new Date().getTime() - this.lastThrowTime;
        if(dif >= 2000){
            this.canThrow = true;
        }
        else{            
            this.canThrow = false;
        }
    }

    draw() {
        // clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_x, 0);
        // space for fix objects
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleInfo);
        this.addToMap(this.gameOver);
        this.addToMap(this.startScreen);
        this.addToMap(this.fullscreen);
        this.addToMap(this.clickNextLevel);
        this.addToMap(this.startGameClick);

        if(this.character.isDeath()){
            setTimeout(()=>{
                this.gameOver.show();
            }, 1500);            
        }

        if(this.gameOver.isShow){ return; } // stop draw iteration

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        })
    }

    setWorld() {
        this.character.world = this;
        this.fullscreen.world = this;
        this.clickNextLevel.world = this;
        this.startGameClick.world = this;
        this.startScreen.world = this;
        // set world for end Boss
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss){ 
                enemy.world = this; 
            }
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    jumpOfSmallChicken(enemy){
        return (this.character.isColliding(enemy) && this.character.speed_y < 0 && this.character.isAboveGround() && !(enemy instanceof Endboss));
    }

    collisionCharacterWithEnemy() {
        // loop enemies
        this.level.enemies.forEach((enemy) => {   
                     
            if (this.jumpOfSmallChicken(enemy)) { 
                enemy.hit(); 
                enemy.playBreakNeckSound(); 
            }
            else if (this.character.isColliding(enemy)) {
                if(!this.character.isHurt()){ this.character.playHurtSound(); } // play one time
                // character is colliding with enemy
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    throwableObjectOnAir() {
        return this.throwableObjects.length > 0 && this.throwableObjects[0].isThrowing;
    }

    collisionThrowableObject() {
        if (this.throwableObjectOnAir()) {
            // smach on bottom?           
            this.throwableObjects[0].checkHitGround();
            // smach enemy
            this.level.enemies.forEach((enemy) => {
                if (this.throwableObjects[0].isColliding(enemy)) {
                    this.throwableObjects[0].isBroken = true;
                    enemy.hit();
                }
            });
            // play sound
            if (this.throwableObjects[0].isBroken) {
                this.throwableObjects[0].playSound();
                this.throwableObjects.splice(0, 1);
            }
        }
    }

    collectObject() {
        for (let i = this.level.collectableObjects.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.level.collectableObjects[i])) {
                // add to throwable Objects
                if (this.level.collectableObjects[i] instanceof Bottle) {
                    // play sound:
                    let beerCollectAudio = new Audio('audio/beerOpen.mp3');
                    beerCollectAudio.play();
                    // add throwable object
                    this.throwableObjects.push(new Bottle());
                    // remove object from drawing
                    this.level.collectableObjects.splice(i, 1);
                    // wait a moment for next throw
                    this.canThrow = false;
                }
            }
        }
    }

    checkCollision() {
        this.collisionCharacterWithEnemy();
        this.collisionThrowableObject();
        this.collectObject();
    }

    checkThrowableObjects() {
        // update ThrowableObjects
        this.throwableObjects.forEach((obj) => { obj.update(); });

        if (this.keyboard.KEY_D) {
            // throw object
            if (this.throwableObjects.length > 0 && !this.throwableObjects[0].isThrowing && this.canThrow) {
                this.throwableObjects[0].throw(this.character.x, this.character.y, this);
                this.lastThrowTime = new Date().getTime();
                this.canThrow = false;
            }
        }
    }
}