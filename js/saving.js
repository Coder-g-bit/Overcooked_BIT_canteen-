const SaveManager = {
    getSave(id, i) {
        const Ob = JSON.parse(localStorage.getItem("Object"));
        const Co = localStorage.getItem("coin");
        const box = [Ob, Co];
        const Object = localStorage.setItem(`${id}_Save${i}`, JSON.stringify(box));
        return Object;
    },
    Load(id, i) {
        let box = [];
        box = localStorage.getItem(`${id}_Save${i}`);
        return box ? JSON.parse(box) : [];
    },
}