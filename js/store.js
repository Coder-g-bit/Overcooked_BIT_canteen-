const go = document.getElementById('Goods');
const goctx = go.getContext('2d');
const co = document.getElementById('colCanvas');
const coctx = co.getContext('2d');
const sh = document.getElementById('shoot');
const shctx = sh.getContext('2d');

const len = 100;
const hei = 100;
const mx = 23;
const my = 150;
let hover = false;

let x = 0;
let y = 0;

const radius = 200;
go.width = window.innerWidth * 0.8;
go.height = window.innerHeight;
co.width = window.innerWidth * 0.8;
co.height = window.innerHeight;
sh.width = window.innerWidth * 0.8;
sh.height = window.innerHeight * 0.2;

const centerX = go.width * 0.35;
const centerY = go.height * 0.35;
const rotationSpeed = 0.01;
const recangles = [{ angle: 0, color: 'red' }, { angle: (2 * Math.PI) / 3, color: 'blue' }, { angle: (4 * Math.PI) / 3, color: 'green' }];

if(CoinManager.getCoin() == 0 && AchievementManager.getAc()[5] == 0){
    AchievementManager.newAc(5);
}
function drawColor() {
    recangles.forEach((rect, index) => {
        if (!hover)
            rect.angle += rotationSpeed;
        goctx.fillStyle = 'white';
        x = centerX + radius * Math.cos(rect.angle) - len / 2;
        y = centerY + radius * Math.sin(rect.angle) - hei / 2;
        goctx.fillRect(x - 5, y - 5, len + 10, hei + 10);
        let image = new Image();
        if (index == 0)
            image.src = '../assets/elements_img/cookTime.png';
        if (index == 1)
            image.src = '../assets/elements_img/doubleCrisp.png';
        if (index == 2)
            image.src = '../assets/elements_img/miceCrisp.png';
        goctx.fillStyle = 'black';
        goctx.drawImage(image, 0, 0, 84, 96, x, y, len, hei);
        coctx.fillStyle = rect.color;
        coctx.fillRect(x, y, len, hei);
        let image2 = new Image();
        image2.src = '../assets/elements_img/Thekey.png';
        goctx.drawImage(image2, 0, 0, 94, 113, 1000, 350, 94, 113);
        goctx.beginPath();
        goctx.font = '50px Impact';
        goctx.fillStyle = goctx.fillText(ObjectManager.getObject()[index].price, x + mx, y + my);
        goctx.fillText(1000, 1000, 350 + my);
        goctx.fillStyle = 'white'
        goctx.fillText(ObjectManager.getObject()[index].price, x + mx + 5, y + my + 5);

    });
};

function Shoot(i) {
    shctx.font = '40px Impact';
    shctx.fillStyle = 'white';
    if (i == 0) {
        shctx.clearRect(0, 0, sh.width, sh.height);
        shctx.fillText("时间暂停：由鼠鼠对美食的思念凝聚而成，能使时间暂停", 0, 50);
        shctx.fillText("并将使用者所感受过的色香味融入到食物中", 0, 100);
    }
    if (i == 1) {
        shctx.clearRect(0, 0, sh.width, sh.height);
        shctx.fillText("双倍金币:化虚为实，化实为虚，光线游走于现实世界中", 0, 50);
        shctx.fillText("思想弥漫在抽象世界中，两者本永不相交", 0, 100);
        shctx.fillText("可这小小的镜子却能将使用者的心里所想折射为手中所持", 0, 150);
    }
    if (i == 2) {
        shctx.clearRect(0, 0, sh.width, sh.height);
        shctx.fillText("“鼠片”零食:和手中的货币有点像，只是看起来更好吃", 0, 50);
        shctx.fillText("但在鼠鼠的世界里，这似乎是一种禁忌的美食", 0, 100);
        shctx.font = 'italic 20px Impact'
        shctx.fillText("“鼠翻开《学生用餐规范及管理办法》一查，这规定没有年代，歪歪斜斜的每页上都写着‘食品安全’四个字。", 60, 130);
        shctx.fillText("鼠横竖睡不着，仔细看了半夜，才从字缝里看出字来，满本都写着两个字是‘吃鼠’！”——《狂鼠日记》", 60, 150);
    }
    if (i == 3) {
        shctx.clearRect(0, 0, sh.width, sh.height);
        shctx.fillText("通关钥匙:锈迹斑斑，似乎是被不断地幻想所侵蚀", 0, 50);
        shctx.fillText("对美味不切实际的臆想会影响所有鼠——除了这把钥匙的拥有者", 0, 100);
    }
}
window.addEventListener('mousemove', function (e) {
    const rect = go.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if ((mouseX - centerX) * (mouseX - centerX) + (mouseY - centerY) * (mouseY - centerY) < (radius * radius))
        hover = true;
    else
        hover = false;
    const detectPixelColor = coctx.getImageData(mouseX, mouseY, 1, 1);
    if (detectPixelColor.data[0] == 255) {
        Shoot(0);
    }
    if (detectPixelColor.data[2] == 255) {
        Shoot(1);
    }
    if (detectPixelColor.data[1] == 128) {
        Shoot(2);
    }
    if (mouseX >= 1000 && mouseX <= 1100 && mouseY >= 350 && mouseY <= 450) {
        Shoot(3);
    }
});

window.addEventListener('click', function (e) {
    const rect = go.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    console.log(mouseX);
    console.log(mouseY);
    const detectPixelColor = coctx.getImageData(mouseX, mouseY, 1, 1);
    console.log(detectPixelColor);
    console.log(CoinManager.getCoin() >= ObjectManager.getObject()[0].price);
    if (detectPixelColor.data[0] == 255 && (CoinManager.getCoin() >= ObjectManager.getObject()[0].price)) {
        CoinManager.reduceCoin(ObjectManager.getObject()[0].price);
        ObjectManager.AddObject(0, 1);
        console.log(ObjectManager.getObject()[0].num);
    }
    if (detectPixelColor.data[2] == 255 && (CoinManager.getCoin() >= ObjectManager.getObject()[1].price)) {
        CoinManager.reduceCoin(ObjectManager.getObject()[1].price);
        ObjectManager.AddObject(1, 1);
        console.log(ObjectManager.getObject()[1].num);
    }
    if (detectPixelColor.data[1] == 128 && (CoinManager.getCoin() >= ObjectManager.getObject()[2].price)) {
        CoinManager.reduceCoin(ObjectManager.getObject()[2].price);
        ObjectManager.AddObject(2, 1);
        console.log(ObjectManager.getObject()[2].num);
    }
    if (mouseX >= 1000 && mouseX <= 1100 && mouseY >= 350 && mouseY <= 450 && (CoinManager.getCoin() >= 1000) && (ObjectManager.getObject()[3].num != 1)) {
        CoinManager.reduceCoin(ObjectManager.getObject()[3].price);
        const New = ObjectManager.getObject();
        New[3].num++;
        ObjectManager.ReObject(New);
    }
    if (mouseX >= 820 && mouseX <= 1140 && mouseY >= 550 && mouseY <= 620) window.location.href = "eastcanteen.html";
    drawInventory();
    drawCoin();
    drawNum();
});
function animate() {
    goctx.clearRect(0, 0, go.width, go.height);
    goctx.fillStyle = 'yellow';
    goctx.fillRect(820, 550, 320, 70);
    goctx.fillStyle = 'blue';
    goctx.fillText("East Canteen", 850, 600);
    drawColor();
    let flag = 0;
    for(let i = 0;i<4;++i){
        if(ObjectManager.getObject()[i].num == 0){
            flag = 1;
        }
    }
    if(flag == 0 && AchievementManager.getAc()[6] == 0)AchievementManager.newAc(6);
    requestAnimationFrame(animate);
}

animate();