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
    <h4 class="register-successful">${registerMessage}</h4>
</div>
<div class="container loginBoxes">
    <div class="row">
        <div class="col">
            <form id="login-form">
                <label for="username">Email</label>
                <input id="username" name="username" type="text"/><br>
                <label for="password">Password</label>
                <input id="password" name="password" type="password"/><br>
                <input id="login-btn" type="submit" value="Log In"/>
            </form>
        </div>
    </div>
</div>





</body>
</html>`;

}


