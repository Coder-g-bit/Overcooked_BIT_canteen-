//>---角色移动、交互（按e）---<
const keys = {};
const Player = document.getElementById('Player');
const ConstSpeed = 3;
let speed = 3;
let posX = 725;
let posY = 25;

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function GameLoop() {
    if (keys['w'] && keys['a']) {
        posY -= speed;
        posX -= speed;
        Player.style.transform = 'rotate(-45deg)';
    } else if (keys['w'] && keys['d']) {
        posY -= speed;
        posX += speed;
        Player.style.transform = 'rotate(45deg)';
    } else if (keys['s'] && keys['a']) {
        posY += speed;
        posX -= speed;
        Player.style.transform = 'rotate(-135deg)';
    } else if (keys['s'] && keys['d']) {
        posY += speed;
        posX += speed;
        Player.style.transform = 'rotate(135deg)';
    } else if (keys['w']) {
        posY -= speed;
        Player.style.transform = 'rotate(0deg)';
    } else if (keys['a']) {
        posX -= speed;
        Player.style.transform = 'rotate(-90deg)';
    } else if (keys['s']) {
        posY += speed;
        Player.style.transform = 'rotate(180deg)';
    } else if (keys['d']) {
        posX += speed;
        Player.style.transform = 'rotate(90deg)';
    } else {
        Player.style.transform = 'rotate(0deg)';
    }
    posX = Math.max(0, Math.min(750, posX));
    posY = Math.max(0, Math.min(650, posY));
    Player.style.left = posX + 'px';
    Player.style.top = posY + 'px';
    requestAnimationFrame(GameLoop);
}

GameLoop();