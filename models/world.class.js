class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    character = new Character();
    currentLevelId = 0;
    level;
    lastLevelID = 2; // game end
    coinInfo = new CoinInfo();
    energyCharacter = new Statusbar('character');
    energyEndboss = new Statusbar('endboss');
    gameOver = new GameOver();
    startScreen = new StartScreen();
    clickNextLevel = new ClickNextLevel();
    startGameClick = new StartGame();
    fullscreen = new Fullscreen();
    bottleInfo = new BottleInfo();
    throwableObjects = [];
    canThrow = true;
    lastThrowTime;
    stopwatch = new Stopwatch();
    score = new Score();

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.loadNextLevel();
        this.setWorld();
        this.startScreen.show();
        this.draw();
    }

    loadNextLevel() {
        this.currentLevelId++;
        if (this.currentLevelId == 1) { this.level = level1; }
        else if (this.currentLevelId == 2) { this.level = level2; }

        // reset all and start game
        this.throwableObjects = [];
        this.coinInfo.nCoins = 0;
        this.character.energy = 100;
        this.character.x = 0;
        this.character.playSound = true;
        this.energyCharacter.setPercentage(100);
        this.energyEndboss.setPercentage(100);
        this.energyEndboss.hide();
        this.gameOver.isShow = false;
        this.setWorld();
        this.runUpdates();
        this.draw();
    }

    cancalAllIntervals(){
        this.character.intervalIds.forEach((id)=>{ clearInterval(id); });
        this.level.enemies.forEach((enemy)=> { enemy.intervalIds.forEach((id)=>{ clearInterval(id); }); });
        this.level.clouds.forEach((cloud)=> { cloud.intervalIds.forEach((id)=>{ clearInterval(id); }); });
        this.level.collectableObjects.forEach((obj)=> { obj.intervalIds.forEach((id)=>{ clearInterval(id); }); });
    }

    runUpdates() {
        this.lastThrowTime = new Date().getTime() - 2001; // init throwTime 

        let interval = setInterval(() => {
////////////////// TESTZWECKE ///////////////////////////////////
            if (!this.startScreen.isShow){
                this.stopwatch.stopTime();
                clearInterval(interval);
                this.pauseAllChickenSounds();
                this.playWinSound();
                this.showEndscreen();
            }
/////////////////////////////////////////////////////////////////
            if (this.startScreen.isShow) {
                this.stopwatch.showTimeLeftBottom = false;
                this.startScreen.checkPressEnter();
            }
            else if (this.character.isDeath()) {
                clearInterval(interval);
                this.stopwatch.stopTime();
                setTimeout(() => {
                    this.pauseAllChickenSounds();
                    this.showGameOver();
                    this.startGameClick.showElement();
                }, 1500);
            }
            else if (this.notEnoughBotttles() && !this.levelFinished()) {
                this.stopwatch.stopTime();
                clearInterval(interval);
                setTimeout(() => {
                    this.pauseAllChickenSounds();
                    this.showGameOver();
                    this.gameOver.notEnoughBottlesTxt();
                    this.startGameClick.showElement();
                }, 3000);
            }
            else if (this.endbossIsRunningAway() && !this.levelFinished()) {
                this.stopwatch.stopTime();
                clearInterval(interval);
                setTimeout(() => {
                    this.pauseAllChickenSounds();
                    this.showGameOver();
                    this.gameOver.endbossIsRunningAwayTxt();
                    this.startGameClick.showElement();
                }, 1000);
            }
            else if (this.levelFinished() && this.gameEnd()) {
                this.stopwatch.stopTime();
                clearInterval(interval);
                this.pauseAllChickenSounds();
                this.playWinSound();
                this.showEndscreen();
            }
            else if (this.levelFinished()) {
                clearInterval(interval);
                this.preperationNextLevel();
            }
            else {
                // gaming time:
                this.stopwatch.showTimeLeftBottom = true;
                this.clickNextLevel.hideElement();
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

    showGameOver() {
        this.gameOver.show();
        this.addToMap(this.gameOver);
    }

    playWinSound() {
        let winSound = new Audio('audio/win.mp3');
        winSound.volume = 0.2;
        winSound.play();
    }

    preperationNextLevel() {
        this.stopwatch.addEllapsedTime();
        this.playWinSound();
        setTimeout(() => {
            this.pauseAllChickenSounds();
            this.aLittleBitDarkerWindow();
            this.clickNextLevel.showElement();
            this.gameOver.isShow = true;
        }, 5000);
    }

    aLittleBitDarkerWindow() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameEnd() {
        if (this.currentLevelId == 2) {
            return true;
        }
        return false;
    }

    reloadWebsite() {
        window.location.href = '/index.html';
    }

    pressedEnterNextLevel() {
        if (this.keyboard.ENTER && this.levelFinished() && this.clickNextLevel.isShow) {
            console.log('pressedEnterNextLevel');
            this.loadNextLevel();
            this.stopwatch.start();
        }
    }

    startGame() {
        this.startScreen.hide();
        this.startGameClick.hideElement();
        this.stopwatch.start();
    }

    pauseAllChickenSounds() {
        this.level.enemies.forEach((enemy) => {
            enemy.pauseChickenSound();
        });
    }

    showEndscreen() {
        this.startScreen.playSound();
        this.pauseAllChickenSounds();
        this.cancalAllIntervals();
    }

    pauseAllChickenSounds() {
        this.level.enemies.forEach((enemy) => {
            enemy.pauseChickenSound();
        });
    }

    levelFinished() {
        if (this.allCoinsCollected() && this.endBossIsDeath()) {
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
        if (this.gameOver.isShow) { return; }
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
        this.addToMap(this.energyCharacter);
        this.addToMap(this.energyEndboss);
        this.addToMap(this.coinInfo);
        this.addToMap(this.bottleInfo);
        this.addToMap(this.fullscreen);
        this.addToMap(this.stopwatch);
        this.addToMap(this.score);

        if (this.startScreen.isShow) {
            this.addToMap(this.startScreen);
            this.addToMap(this.startGameClick);
        }

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    endbossIsRunningAway() {
        if (this.getEndbossPosition() < -1000) { return true; }
        return false;
    }

    getCountCollectableBottles() {
        let n = 0;
        this.level.collectableObjects.forEach((elm) => {
            if (elm instanceof Bottle) { n++; }
        });
        return n;
    }

    getEndbossEnergy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            if (this.level.enemies[i] instanceof Endboss) {
                return this.level.enemies[i].energy;
            }
        }
        return;
    }

    getEndbossPosition() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            if (this.level.enemies[i] instanceof Endboss) {
                return this.level.enemies[i].x;
            }
        }
        return;
    }

    notEnoughBotttles() {
        let nCollectableBottles = this.getCountCollectableBottles();
        let nObjectsToThrow = this.throwableObjects.length;
        let sum = nCollectableBottles + nObjectsToThrow;
        let canMaximumSubtractEnergy = sum * 25;
        if (this.getEndbossEnergy() - canMaximumSubtractEnergy > 0) {
            return true;
        }
        return false;
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
        this.gameOver.world = this;
        this.clickNextLevel.world = this;
        this.startGameClick.world = this;
        this.startScreen.world = this;
        this.stopwatch.world = this;
        this.score.world = this;
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
                this.energyCharacter.setPercentage(this.character.energy);
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
                    if (enemy instanceof Endboss) { this.energyEndboss.setPercentage(enemy.energy); }
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
        let allCollected = true;
        this.level.collectableObjects.forEach((e) => {
            if (e instanceof Coin) {
                allCollected = false;
            }
        });
        return allCollected;
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