class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    character = new Character();
    level;
    coinInfo = new CoinInfo();
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
        this.loadLevel(level1);
        this.setWorld();
        this.startScreen.show();
        this.runUpdates();
        this.draw();
    }

    resetStatus() {
        this.camera_x = 0;
        this.character = new Character();
        this.canThrow = true;
        this.throwableObjects = [];
        this.lastThrowTime = new Date().getTime() - 2001; // init throwTime
        this.statusBar = new Statusbar();
        this.bottleInfo = new BottleInfo();
        this.setWorld();
        this.loadLevel(level1);
    }

    loadLevel(level) {
        this.level = level;
    }

    runUpdates() {
        this.lastThrowTime = new Date().getTime() - 2001; // init throwTime

        let interval = setInterval(() => {            

            if (this.startScreen.isShow) {
                this.startScreen.waitingForStartingGame();
            }
            else if (this.character.isDeath()) {
                // make nothing, waiting for restart game
            }
            else if (this.levelFinished()) {
                clearInterval(interval);
                this.clickNextLevel.showElement();
            }
            else {
                // game updates
                this.checkCollision();
                this.checkThrowableObjects();
                this.setCanThrow();
                this.updateBottleInfo();
                this.clickNextLevel.update();
                this.startGameClick.update();
                this.startScreen.update();                
            }

        }, 1000 / 60);
    }

    levelFinished() {
        if (this.allCoinsCollected() && this.endBossIsDeath()) {
            let winSound = new Audio('audio/win.mp3');
            winSound.volume = 0.2;
            winSound.play();
            return true;
        }
        return false;
    }

    endBossIsDeath() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            if (this.level.enemies[i] instanceof Endboss) {
                if (this.level.enemies[i].energy == 0) {
                    return true;
                }
            }
        }
        return false;
    }

    updateBottleInfo() {
        if (this.throwableObjects.length > 0 && this.throwableObjects[0].isThrowing) {
            this.bottleInfo.setBottles(this.throwableObjects.length - 1);
        }
        else {
            this.bottleInfo.setBottles(this.throwableObjects.length);
        }
    }

    setCanThrow() {
        let dif = new Date().getTime() - this.lastThrowTime;
        if (dif >= 2000) {
            this.canThrow = true;
        }
        else {
            this.canThrow = false;
        }
    }

    draw() {
        // clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fullscreen.update();
        // able camera walking effect
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);

        // disable camera walking effect
        this.ctx.translate(-this.camera_x, 0);
        // space for fix objects
        this.addToMap(this.statusBar);
        this.addToMap(this.coinInfo);
        this.addToMap(this.bottleInfo);
        this.addToMap(this.gameOver);

        if (this.startScreen.isShow) {
            this.addToMap(this.startScreen);
            this.addToMap(this.startGameClick);
        }

        this.addToMap(this.fullscreen);
        this.addToMap(this.clickNextLevel);


        if (this.character.isDeath()) {
            setTimeout(() => {
                this.gameOver.show();
                this.startGameClick.showElement();
            }, 1500);
        }

        if (this.gameOver.isShow) { return; } // stop draw iteration

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
        this.coinInfo.world = this;
        this.fullscreen.world = this;
        this.clickNextLevel.world = this;
        this.startGameClick.world = this;
        this.startScreen.world = this;
        // set world for end Boss
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
                enemy.update();
                enemy.animate();
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

    jumpOfSmallChicken(enemy) {
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
                if (!this.character.isHurt()) { this.character.playHurtSound(); } // play one time
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

    collectBottle(indx) {
        // play sound:
        let beerCollectAudio = new Audio('audio/beerOpen.mp3');
        beerCollectAudio.play();
        // add throwable object
        this.throwableObjects.push(new Bottle());
        // remove object from drawing
        this.level.collectableObjects.splice(indx, 1);
        // wait a moment for next throw
        this.canThrow = false;
    }

    collectCoin(indx) {
        // play sound:
        this.level.collectableObjects[indx].playSound();
        // add throwable object
        this.coinInfo.addCoin();
        // remove object from drawing
        this.level.collectableObjects.splice(indx, 1);
    }

    allCoinsCollected() {
        let collectedAllCoins = true;
        this.level.collectableObjects.forEach((e) => {
            if (e instanceof Coin) {
                collectedAllCoins = false;
            }
        });
        return collectedAllCoins;
    }

    collectObject() {
        for (let i = this.level.collectableObjects.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.level.collectableObjects[i])) {
                // add to throwable Objects
                if (this.level.collectableObjects[i] instanceof Bottle) {
                    this.collectBottle(i);
                }
                else if (this.level.collectableObjects[i] instanceof Coin) {
                    this.collectCoin(i);
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