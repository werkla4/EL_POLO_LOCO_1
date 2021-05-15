const level1 = new Level(
        [
            new Chicken(700 + Math.random()*500),
            new Chicken(700 + Math.random()*1000),
            new YellowChicken(700 + Math.random()*1500),
            new Chicken(700 + Math.random()*2000),
            new Endboss()
        ],
        [
            new Cloud()
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
            new Bottle(300, 370),
            new Bottle(400, 370),
            new Bottle(500, 370)
        ]
);