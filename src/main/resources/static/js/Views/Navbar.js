import Register from "./Register.js";
import Login from "./Login.js";


export default function Navbar(props) {
    console.log(props);
    return `
<header>
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4 jumboTitle">Gamerz Corner</h1>
  </div>
</div>
<nav class="navbar navbar-expand-lg navbar-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
       <ul class="navbar-nav glow">
          <li>
          <a class="nav-item active" href="/" data-link>Home</a>
          </li>
          <li >
                <a class="nav-item active" href="/marketPlace" data-link>Market Place</a>
          </li>
          <li>
                <a class="nav-item" href="/messageBoards" data-link>Message Boards</a>
          </li>
    
          <li>
                <a class="nav-item" href="/friends" data-link>Friends</a>
          </li>
                <li>
                <a class="nav-item" id="login-link" data-toggle="modal" data-target="#login" data-link href="/login" data-link>Login</a>
          </li>
          <li>
                <a class="nav-item" id="register-link"  data-target="#register" data-link href="/register">Register</a>
          </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle nav-item" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          More
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item nav-item" href="/profile" data-link>Profile</a></a>
          <a class="dropdown-item nav-item" href="/about" data-link>About</a>
          <a class="dropdown-item nav-item" href="/account" data-link>Account</a>
        </div>
      </li>
      <li><!-- Button trigger modal -->

<!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">-->
<!--  Register-->
<!--</button></li>-->
       </ul>
  </div>
</nav>
</header>
    `;
}
// ${Register(props)}
//
// ${Login(props)}