function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username=='LPU123' && password=='LPU123'){
        alert(" sucess full !")
        window.location.assign("CSE326.html")
    }

    console.log('Username:', username);
    console.log('Password:', password);
}
