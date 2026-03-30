//>---角色移动、交互（按e）---<
const keys = {};
const Player = document.getElementById('Player');
const playerR = 25;
const ConstSpeed = 2;
let speed = 2;
let posX = 725;
let posY = 70;

if ('posXinGame' in localStorage) {
    posX = localStorage.getItem('posXinGame');
    posY = localStorage.getItem('posYinGame');
    localStorage.removeItem('posXinGame');
    localStorage.removeItem('posYinGame');
}

setTimeout(function(){playAudio('game_bgm');},500);
volumeDown('game_bgm',0.1);
setInterval(function(){playAudio('game_bgm');},14500);

window.addEventListener('keypress', (e) => {
    if (posX < 670 && posY > 125 && posY < 250 && e.key == 'e') {
        document.getElementById('enter-east-canteen').style.display = 'block';
        speed = 0;
    }
    else if (posX < 350 && posY > 320 && posY < 405 && e.key == 'e') {
        document.getElementById('enter-north-canteen').style.display = 'block';
        speed = 0;
    }
    //console.log(ObjectManager.getObject())
    if(CheckCircleDistance(660,460,60) && e.key == ' ' && ObjectManager.getObject()[3].num){
        window.location.href = "../html/ending.html";
    }
    else if(e.key == ' ' && CheckCircleDistance(660,460,60)){
        alert('You need A KEY!\nFind it in Store');
        keys['w'] =  keys['a'] =  keys['s'] =  keys['d'] = false;
    }
});

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function GameLoop() {
    if ((keys['w'] || keys['a'] || keys['s'] || keys['d']) && speed) {
        playAudio("walking-sound");
    }
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
    CheckBlock(600, 150, 50, 100);
    CheckBlock(200, 350, 120, 70);
    CheckBlock(690, 10, 100, 60);
    if(CheckCircleDistance(660,460,60))speed = 1;
    else speed = ConstSpeed;
    //console.log(posX,posY)
    posX = Math.max(0, Math.min(750, posX));
    posY = Math.max(0, Math.min(650, posY));
    Player.style.left = posX + 'px';
    Player.style.top = posY + 'px';
    requestAnimationFrame(GameLoop);
}

GameLoop();

function CheckBlock(x, y, w, h) {
    let Left = x;
    let Bottom = y + h;
    let Right = x + w;
    let Top = y;
    let middleX = posX + playerR;
    let middleY = posY + playerR;
    let err = speed;
    if (Left <= middleX && middleX <= Right && middleY + playerR <= Top + err) posY = Math.min(Top - 2 * playerR, posY);
    if (Left <= middleX && middleX <= Right && posY >= Bottom - err) posY = Math.max(Bottom, posY);
    if (Top <= middleY && middleY <= Bottom && middleX + playerR <= Left + err) posX = Math.min(Left - 2 * playerR, posX);
    if (Top <= middleY && middleY <= Bottom && posX >= Right - err) posX = Math.max(Right, posX);
    if ((middleX - Left) * (middleX - Left) + (middleY - Top) * (middleY - Top) <= playerR * playerR - err) posX -= err, posY -= err;
    if ((middleX - Left) * (middleX - Left) + (middleY - Bottom) * (middleY - Bottom) <= playerR * playerR - err) posX -= err, posY += err;
    if ((middleX - Right) * (middleX - Right) + (middleY - Top) * (middleY - Top) <= playerR * playerR - err) posX += err, posY -= err;
    if ((middleX - Right) * (middleX - Right) + (middleY - Bottom) * (middleY - Bottom) <= playerR * playerR - err) posX += err, posY += err;
}

function CheckCircleDistance(cX,cY,cR){
    const err = speed;
    let middleX = posX+playerR;
    let middleY = posY+playerR;
    return (middleX-cX)*(middleX-cX)+(middleY-cY)*(middleY-cY)<=(cR+playerR)*(cR+playerR)
}


function enter_canteen_east() {
    playAudio("door-open-sound");
    setTimeout(function(){window.location.href = "../html/eastcanteen.html";},500);
    speed = ConstSpeed;
    localStorage.setItem('posXinGame', posX);
    localStorage.setItem('posYinGame', posY);
    localStorage.removeItem('posXinEastCanteen');
    localStorage.removeItem('posYinEastCanteen');
}

function Hide(BoxID) {
    document.getElementById(BoxID).style.display = 'none';
    speed = ConstSpeed;
}

function enter_canteen_north() {
    playAudio("door-open-sound");
    setTimeout(function(){window.location.href = "../html/mini_game_2.html";},500);
    speed = ConstSpeed;
    localStorage.setItem('posXinGame', posX);
    localStorage.setItem('posYinGame', posY);
}

function playAudio(AudioID) {
  var audio = document.getElementById(AudioID);
  audio.play();
}

function pauseAudio(AudioID) {
  var audio = document.getElementById(AudioID);
  audio.pause();
}

function stopAudio(AudioID) {
  var audio = document.getElementById(AudioID);
  audio.pause();
  audio.currentTime = 0;
}

function volumeDown(AudioID, v) {
  var audio = document.getElementById(AudioID);
  audio.volume = v;
}