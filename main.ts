namespace SpriteKind {
    export const Puntero = SpriteKind.create()
    export const Rounding_Proyectile = SpriteKind.create()
    export const Big_Enemy = SpriteKind.create()
}
function Create_TetraShot1 () {
    while (true) {
        pause(1000)
        speed_bullet5 = 50
        projectile2 = sprites.createProjectileFromSprite(assets.image`projectile`, Main_Tower, speed_bullet5, 0)
        projectile2 = sprites.createProjectileFromSprite(assets.image`projectile`, Main_Tower, -1 * speed_bullet5, 0)
        projectile2 = sprites.createProjectileFromSprite(assets.image`projectile`, Main_Tower, 0, -1 * speed_bullet5)
        projectile2 = sprites.createProjectileFromSprite(assets.image`projectile`, Main_Tower, 0, speed_bullet5)
    }
}
function Start_Auto_Gun1 () {
    while (true) {
        pause(500)
        x = 0
        y = 0
        best = 0
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            distance = Math.sqrt((Main_Tower.x - value.x) ** 2 + (Main_Tower.y - value.y) ** 2)
            if (Math.abs(distance) > Math.abs(best)) {
                best = distance
                x = value.x
                y = value.y
            }
        }
        if (x != 0 && y != 0) {
            Total_Vel = Math.abs(x - Main_Tower.x) + Math.abs(y - Main_Tower.y)
            Porcentaje_x = (x - Main_Tower.x) / Total_Vel
            Porcentaje_Y = (y - Main_Tower.y) / Total_Vel
            projectile = sprites.createProjectileFromSprite(assets.image`proyectile0`, Main_Tower, Porcentaje_x * 250, Porcentaje_Y * 250)
            projectile.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Big_Enemy, function (sprite, otherSprite) {
    Enemy1 = sprites.create(assets.image`enemy0`, SpriteKind.Enemy)
    Enemy1.setVelocity(4 * otherSprite.vx, 4 * otherSprite.vy)
    Enemy1.setPosition(otherSprite.x, otherSprite.y)
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
function Create_Circling_Proyectile1 () {
    Rounding_Bullet_1 = sprites.create(assets.image`bullet1`, SpriteKind.Rounding_Proyectile)
    while (true) {
        degrees += 0.03
        if (degrees > 360) {
            degrees = 0
        }
        Rounding_Bullet_1.setPosition(75 + Math.cos(degrees) * 40, 60 + Math.sin(degrees) * 40)
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    if (info.life() - 5 > 1) {
        info.changeLifeBy(-5)
    } else {
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.Big_Enemy)
        Start_Round()
    }
})
browserEvents.onMouseMove(function (x, y) {
    browserEvents.setCursorVisible(false)
    Puntero.setPosition(x, y)
    if (Mouse_Start < 20) {
        Mouse_Start += 1
    } else {
        Mouse_Start = 0
        Total_Vel = Math.abs(x - Main_Tower.x) + Math.abs(y - Main_Tower.y)
        Porcentaje_x = (x - Main_Tower.x) / Total_Vel
        Porcentaje_Y = (y - Main_Tower.y) / Total_Vel
        projectile = sprites.createProjectileFromSprite(assets.image`bullet2`, Main_Tower, Porcentaje_x * 250, Porcentaje_Y * 250)
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
sprites.onOverlap(SpriteKind.Big_Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    if (info.life() - 40 > 1) {
        info.changeLifeBy(-40)
    } else {
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.Big_Enemy)
        Start_Round()
    }
})
sprites.onOverlap(SpriteKind.Rounding_Proyectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
function Start_Round () {
    Dificulty = 1000
    scene.setBackgroundImage(assets.image`planet`)
    Main_Tower = sprites.create(assets.image`WatchTower0`, SpriteKind.Player)
    Main_Tower.setPosition(75, 60)
    info.setLife(100)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(sprite)
})
let Wall_Spawn = 0
let enemy2: Sprite = null
let Mouse_Start = 0
let degrees = 0
let Rounding_Bullet_1: Sprite = null
let Enemy1: Sprite = null
let projectile: Sprite = null
let Porcentaje_Y = 0
let Porcentaje_x = 0
let Total_Vel = 0
let distance = 0
let best = 0
let y = 0
let x = 0
let projectile2: Sprite = null
let speed_bullet5 = 0
let Puntero: Sprite = null
let Main_Tower: Sprite = null
let Dificulty = 0
let Round = 1
Dificulty = 1000
scene.setBackgroundImage(assets.image`planet`)
Main_Tower = sprites.create(assets.image`WatchTower0`, SpriteKind.Player)
Main_Tower.setPosition(75, 60)
info.setLife(100)
Puntero = sprites.create(assets.image`Puntero0`, SpriteKind.Puntero)
Start_Auto_Gun1()
forever(function () {
    pause(Dificulty * 10)
    enemy2 = sprites.create(assets.image`enemy2`, SpriteKind.Big_Enemy)
    Wall_Spawn = randint(0, 3)
    if (Wall_Spawn == 0) {
        enemy2.setPosition(160, randint(0, 120))
    } else if (Wall_Spawn == 1) {
        enemy2.setPosition(0, randint(0, 120))
    } else if (Wall_Spawn == 2) {
        enemy2.setPosition(randint(0, 160), 120)
    } else {
        enemy2.setPosition(randint(0, 160), 0)
    }
    enemy2.setVelocity(0.1 * (Main_Tower.x - enemy2.x), 0.1 * (Main_Tower.y - enemy2.y))
    enemy2.image.flipX()
})
forever(function () {
    pause(Dificulty)
    Enemy1 = sprites.create(assets.image`enemy_0`, SpriteKind.Enemy)
    Wall_Spawn = randint(0, 3)
    if (Wall_Spawn == 0) {
        Enemy1.setPosition(160, randint(0, 120))
    } else if (Wall_Spawn == 1) {
        Enemy1.setPosition(0, randint(0, 120))
    } else if (Wall_Spawn == 2) {
        Enemy1.setPosition(randint(0, 160), 120)
    } else {
        Enemy1.setPosition(randint(0, 160), 0)
    }
    Enemy1.setVelocity(0.4 * (Main_Tower.x - Enemy1.x), 0.4 * (Main_Tower.y - Enemy1.y))
    if (Dificulty - 100 > 0) {
        Dificulty += -10
    }
})
