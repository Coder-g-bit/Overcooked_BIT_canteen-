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
