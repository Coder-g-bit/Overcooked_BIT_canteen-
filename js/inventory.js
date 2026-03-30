const iv = document.getElementById('inventory');
const ivctx = iv.getContext('2d');

iv.width = window.innerWidth * 0.2;
iv.height = window.innerHeight * 0.9;
let right = 0;
let flag = false;
const CoinManager = {
    getCoin() {
        const coin = localStorage.getItem("coin");
        return coin ? parseInt(coin) : 0;
    },

    addCoin(value) {
        const currentCoin = this.getCoin();
        const newCoin = currentCoin + value;
        localStorage.setItem("coin", newCoin);
        return newCoin;
    },

    reduceCoin(value) {
        const currentCoin = this.getCoin();
        const newCoin = currentCoin - value;
        localStorage.setItem("coin", newCoin);
        return newCoin;
    },

    clearCoin() {
        localStorage.removeItem("coin");
    }
};

//InObjects提前刷新函数 防止undifined//
const ObjectManager = {
    InObjects() {
        localStorage.setItem('Object', JSON.stringify([{
            name: 'cookingTime',
            price: 60,
            num: 0,
        },
        {
            name: 'doubleCrisp',
            price: 22,
            num: 0,
        },
        {
            name: 'MiceCrisp',
            price: 99,
            num: 0,
        },
        {
            name: 'theKey',
            price: 1000,
            num: 0,
        },]))
    },
    getObject() {
        const Object = localStorage.getItem('Object');
        return Object ? JSON.parse(Object) : [{
            name: 'cookingTime',
            price: 60,
            num: 0,
        },
        {
            name: 'doubleCrisp',
            price: 22,
            num: 0,
        },
        {
            name: 'MiceCrisp',
            price: 99,
            num: 0,
        },
        {
            name: 'theKey',
            price: 1000,
            num: 0,
        },];
    },
    ReObject(Objects) {
        const Object = localStorage.setItem("Object", JSON.stringify(Objects));
        return Object;
    },
    AddObject(i, n) {
        let Object = ObjectManager.getObject();
        Object[i].num += n;
        ObjectManager.ReObject(Object);
    },
    ObDel() {
        localStorage.removeItem('Object');
    },
};

function drawInventory() {
    ivctx.fillStyle = '#c6e4fd';
    ivctx.fillRect(0, 0, iv.width, iv.height);
    let image2 = new Image();
    image2.src = '../assets/elements_img/Thekey.png';
    if (ObjectManager.getObject()[3].num)
        ivctx.drawImage(image2, 0, 0, 94, 113, 45, 100, 94, 113);
    let image_1 = new Image();
    image_1.src = '../assets/elements_img/cookTime.png';
    ivctx.drawImage(image_1, 0, 0, 84, 96, 45, 290, 100, 100);
    let image_2 = new Image();
    image_2.src = '../assets/elements_img/doubleCrisp.png';
    ivctx.drawImage(image_2, 0, 0, 84, 96, 45, 440, 100, 100);
    let image_3 = new Image();
    image_3.src = '../assets/elements_img/miceCrisp.png';
    ivctx.drawImage(image_3, 0, 0, 93, 83, 45, 590, 100, 100);

}

function drawCoin() {
    let image = new Image();
    image.src = '../assets/elements_img/rice-crisp.png';
    ivctx.drawImage(image, 0, 0, 1225, 943, 0, 0, 70, 50);
    ivctx.font = '50px Impact';
    ivctx.fillStyle = 'white';
    ivctx.fillText(CoinManager.getCoin(), 70, 45);

}

function drawNum() {
    ivctx.font = '50px Impact';
    ivctx.fillStyle = 'white';
    ivctx.fillText(ObjectManager.getObject()[0].num, 150, 390);
    ivctx.fillText(ObjectManager.getObject()[1].num, 150, 540);
    ivctx.fillText(ObjectManager.getObject()[2].num, 150, 690);
}

window.addEventListener('keydown', function (e) {
    if (e.key == 'b') {
        flag = !flag;
        let stopInterval = setInterval(function () {
            if (!flag) {
                ivctx.fillStyle = 'wheat';
                ivctx.fillRect(right, 0, iv.width - right, iv.height);
                right -= 3;
                if (right < 0) clearInterval(stopInterval);
            }
            if (flag) {
                drawInventory();
                drawCoin();
                drawNum();
                ivctx.fillStyle = 'wheat';
                ivctx.fillRect(right, 0, iv.width - right, iv.height);
                right += 3;
                if (right > iv.width) clearInterval(stopInterval);
            }
        }, 10);
    }
})
const Body = document.getElementById('game-box');

function cookingTime() {
    //加特效
    alert('Cooking time!');
    clearInterval(timer);
    clearInterval(StopGenerateOrders);
    for (let i = 0; i < 4; ++i) {
        clearInterval(StopOrderClockName[i]);
    }
    setTimeout(() => {
        timer = setInterval(StartCountDown, 1000);
        StopGenerateOrders = setInterval(function () { GenerateOrders(); }, 10000)
        for (let i = 0; i < 4; ++i) {
            StopOrderClockName[i] = setInterval(() => { StartCountDownOrder(i, document.getElementById('order-' + i)); }, 1000)
        }
    }, 15000);
}
let DoubleMoney = 0;
function doubleCrisp() {
    alert('Double Money!')
    DoubleMoney = 1;
    // Body.innerHTML//特效
    setTimeout(function () {
        DoubleMoney = 0;
    }, 60000);
}

window.addEventListener('click', function (e) {
    const rect = iv.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (mouseX >= 45 && mouseX <= 145 && mouseY >= 290 && mouseY <= 390 && ObjectManager.getObject()[0].num >= 1) {
        ObjectManager.AddObject(0, -1);
        cookingTime();
    }
    if (mouseX >= 45 && mouseX <= 145 && mouseY >= 440 && mouseY <= 540 && ObjectManager.getObject()[1].num >= 1) {
        ObjectManager.AddObject(1, -1);
        doubleCrisp();
    }
    ivctx.clearRect(0, 0, iv.width, iv.height);
    if (flag) {
        drawInventory();
        drawCoin();
        drawNum();
    }
})