const level2 = new Level(
        [
            new Chicken(700 + Math.random()*500),
            new Chicken(700 + Math.random()*1000),
            new YellowChicken(700 + Math.random()*1500),
            new Chicken(700 + Math.random()*2000),
            new Endboss()
        ],
        [
            new Cloud(100),
            new Cloud(500),
            new Cloud(1300),
            new Cloud(1500),
            new Cloud(2000),
            new Cloud(2900)
        ],
        [
            new BackgroundObjects('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', -719),
            new BackgroundObjects('../img/5.Fondo/Capas/3.Fondo3/2.png', -719),
            new BackgroundObjects('../img/5.Fondo/Capas/2.Fondo2/2.png', -719),
            new BackgroundObjects('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', -719),

            new BackgroundObjects('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
            new BackgroundObjects('../img/5.Fondo/Capas/3.Fondo3/1.png', 0),
            new BackgroundObjects('../img/5.Fondo/Capas/2.Fondo2/1.png', 0),
            new BackgroundObjects('../img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
            new BackgroundObjects('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719),
            new BackgroundObjects('../img/5.Fondo/Capas/3.Fondo3/2.png', 719),
            new BackgroundObjects('../img/5.Fondo/Capas/2.Fondo2/2.png', 719),
            new BackgroundObjects('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719),

            new BackgroundObjects('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 2 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/3.Fondo3/1.png', 2 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/2.Fondo2/1.png', 2 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/1.suelo-fondo1/1.png', 2 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 3 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/3.Fondo3/2.png', 3 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/2.Fondo2/2.png', 3 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', 3 * 719), 

            new BackgroundObjects('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 4 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/3.Fondo3/1.png', 4 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/2.Fondo2/1.png', 4 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/1.suelo-fondo1/1.png', 4 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 5 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/3.Fondo3/2.png', 5 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/2.Fondo2/2.png', 5 * 719),
            new BackgroundObjects('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', 5 * 719)
        ],
        [
            new Bottle(400, 370),
            new Bottle(420, 370),
            new Bottle(440, 370),
            new Bottle(460, 370),
            new Coin(800, 300),
            new Coin(850, 250),
            new Coin(900, 200)
        ]
);