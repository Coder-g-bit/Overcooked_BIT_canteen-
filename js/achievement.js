function Acget(i) {
    if (i == 0) alert("恭喜！您完成了成就：鼠能生巧，请于成就界面查看");
    if (i == 1) alert("恭喜！您完成了成就：鼠而不漏，请于成就界面查看");
    if (i == 2) alert("恭喜！您完成了成就：鼠手无策，请于成就界面查看");
    if (i == 3) alert("恭喜！您完成了成就：各鼠己见，请于成就界面查看");
    if (i == 4) alert("恭喜！您完成了成就：Quiet as a mouse，请于成就界面查看");
    if (i == 5) alert("恭喜！您完成了成就：Poor as a church mouse，请于成就界面查看");
    if (i == 6) alert("恭喜！您完成了成就：Pack Rat，请于成就界面查看");
    if (i == 7) alert("恭喜！您完成了成就：Rat Some Out，请于成就界面查看");
    if (i == 8) alert("恭喜！您完成了成就：罄竹难鼠，请于成就界面查看");
    if (i == 9) alert("恭喜！您完成了成就：鼠一鼠二，请于成就界面查看");
}
const AchievementManager = {
    InAc() {
        const Username = localStorage.getItem('currentUser');
        localStorage.setItem(`${Username}_Ac`, JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    },
    getAc() {
        const Username = localStorage.getItem('currentUser');
        const achievements = localStorage.getItem(`${Username}_Ac`);
        //console.log(achievements);
        return achievements ? JSON.parse(achievements) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    },
    newAc(i) {
        let box = AchievementManager.getAc();
        if (box[i] == 0) {
            box[i]++;
            Acget(i);
        }
        const Username = localStorage.getItem('currentUser');
        localStorage.setItem(`${Username}_Ac`, JSON.stringify(box));
    },
    clearAc() {
        const Username = localStorage.getItem('currentUser');
        localStorage.removeItem(`${Username}_Ac`);
    }
}