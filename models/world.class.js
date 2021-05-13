class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    character = new Character();
    level = level1;
    statusBar = new Statusbar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.checkCollision();
        this.draw();
        this.runUpdates();
    }

    runUpdates() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowableObjects();
        }, 1000 / 10);
    }

    draw() {
        // clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        // space for fix objects
        this.addToMap(this.statusBar);

        let self = this;
        requestAnimationFrame(() => {
            self.draw()
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        })
    }

    setWorld() {
        this.character.world = this;
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

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowableObjects() {
        if(this.keyboard.KEY_D){
            let bottle = new ThrowableObjects(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);            
        }
    }
}