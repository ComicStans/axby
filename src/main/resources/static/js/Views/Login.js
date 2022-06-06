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
<h1>Log In</h1>

<!-- Button trigger modal -->
<!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#login">-->
<!--  Launch demo modal-->
<!--</button>-->

<!-- Modal -->
<!--<div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
<!--  <div class="modal-dialog" role="document">-->
<!--    <div class="modal-content">-->
<!--      <div class="modal-header">-->
<!--        <h5 class="modal-title" id="exampleModalLabel">Login</h5>-->
<!--        <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--          <span aria-hidden="true">&times;</span>-->
<!--        </button>-->
<!--      </div>-->
<!--      <div class="modal-body">-->
<div>
    <h4 class="register-successful">${registerMessage}</h4>
</div>
<div class="container">
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

<!--      </div>-->
<!--      <div class="modal-footer">-->
<!--        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
<!--        <button type="button" class="btn btn-primary">Save changes</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->



</body>
</html>`;

}


