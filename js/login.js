function bgmstart() {
    let audio = document.getElementById('loginbgm');
    audio.play();
}
function toRegister() {
    let a = document.getElementById('loginpage');
    a.style.display = "none"
    let b = document.getElementById('registerpage');
    b.style.display = "block"
}
function toLogin() {
    document.getElementById('registerpage').style.display = "none";
    document.getElementById('loginpage').style.display = "block";
    document.getElementById('username').value = localStorage.getItem('username');
    document.getElementById('password').value = localStorage.getItem('password');
}
function Login() {
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    if (u === "" || p === "") {
        alert("Please enter your username and password!");
    }
    else {
        if (u in localStorage) {
            const userd = localStorage.getItem(u);
            let password = JSON.parse(userd).password;
            if (p === password) {
                ObjectManager.ObDel();
                console.log(ObjectManager.getObject);
                CoinManager.clearCoin();
                console.log(CoinManager.getCoin());
                alert("Login successfully!");
                window.location.href = "html/startgame.html"
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
                localStorage.setItem("currentUser", u);
            }
            else {
                alert("Wrong password!");
                document.getElementById('password').value = "";
            }
        }
        else {
            alert("The user does not exist, please register first!");
        }
    }
}
function Register() {
    let u = document.getElementById('RegisterUsername').value;
    let p1 = document.getElementById('RegisterPassword1').value;
    let p2 = document.getElementById('RegisterPassword2').value;
    if (u === "" || p1 === "" || p2 === "") {
        alert("Please enter your username or password!");
    }
    else {
        if (u in localStorage) {
            alert("Username existed!");
            document.getElementById('RegisterUsername').value = "";
            document.getElementById('RegisterPassword1').value = "";
            document.getElementById('RegisterPassword2').value = "";
        }
        else if (p1 !== p2) {
            alert("Passwords fail to match!");
        }
        else {
            var userdata = {
                password: p1,
                achievement: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ],
            }
            localStorage.setItem('username', u);
            localStorage.setItem('password', p1);
            localStorage.setItem(u, JSON.stringify(userdata));
            alert("Register success");
            toLogin();
        }
    }
}