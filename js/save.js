function toggleMenu() {
    var menuPanel = document.getElementById('menuPanel');
    var overlay = document.getElementById('overlay');
    menuPanel.style.display = (menuPanel.style.display === 'block' ? 'none' : 'block');
    overlay.style.display = (overlay.style.display === 'block' ? 'none' : 'block');
}

function save() {
    // 获取当前时间
    var now = new Date();
    var timestamp = now.getFullYear() + '-' +
        (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
        now.getDate().toString().padStart(2, '0') + ' ' +
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0') + ':' +
        now.getSeconds().toString().padStart(2, '0');

    // 保存当前时间戳到localStorage
    localStorage.setItem('currentSaveTime', timestamp);
    var tempurl = window.location.href;
    localStorage.setItem('tempurl', tempurl);
    window.location.href = "../html/load.html"
    // 跳转到选择存档页面
    window.location.href = "../html/load.html";
}

function initializeSlots() {
    document.querySelectorAll('.save-slot').forEach(function (slot, index) {
        var saveTime = localStorage.getItem(`saveSlot${index + 1}`);
        if (saveTime) {
            slot.innerText = `Slot${index + 1}: ${saveTime}`;
        } else {
            slot.innerText = `Slot${index + 1}(Empty)`;
        }
    });
}


function goHome() {
    window.location.href = "../html/startgame.html";
}