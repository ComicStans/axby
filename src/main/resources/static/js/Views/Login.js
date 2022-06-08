export default function Login(props) {

    var registerMessage = "";
    if(localStorage.getItem("justRegistered")) {
        registerMessage = "YOU'VE SUCCESSFULLY REGISTERED! PLEASE LOGIN!"
        localStorage.removeItem("justRegistered")
    }
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Log In</title>
</head>
<body>
<p class="titlePage">Log In</p>
<hr class="hr-title">

<div>
    <p class="register-successful">${registerMessage}</p>
</div>
<div class="container loginBoxes">
    <div class="row">
            <div class="col">
                <img src="../../Images/Mario.png" style="max-width: 65%; max-height: 65%; margin-top: 1em; margin-left: 8em;">
            </div>
        <div class="col">
            <form id="login-form" >
                <label for="username">Email</label>
                <input id="username" style="width: 50%" name="username" type="text"/><br>
                <label for="password">Password</label>
                <input id="password" style="width: 50%" name="password" type="password"/><br>
                <input id="login-btn" type="submit" value="Log In"/>
            </form>
        </div>
    </div>
</div>
</body>
</html>`;

}
