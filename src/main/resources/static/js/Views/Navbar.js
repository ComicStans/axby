import Register from "./Register.js";
import Login from "./Login.js";


export default function Navbar(props) {
    return `
<nav class="navbar navbar-expand-lg navbar-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
       <ul class="navbar-nav glow">
          <li class="nav-item">
                <a href="/" data-link>Home</a>
          </li>
          <li class="nav-item active">
                <a href="/marketPlace" data-link>Market Place</a>
          </li>
          <li class="nav-item">
                <a href="/messageBoards" data-link>Message Boards</a>
          </li>
          <li class="nav-item">
                <a href="/friends" data-link>Friends</a>
          </li>
          <li class="nav-item">
                <a id="login-link" data-toggle="modal" data-target="#login" data-link href="#"" data-link>Login</a>
          </li>
          <li class="nav-item">
                <a id="register-link" data-toggle="modal" data-target="#register" data-link href="#">Register</a>
          </li>
    
          <li class="nav-item dropdown">
             <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="/profile" data-link>Profile</a></a>
                  <a class="dropdown-item" href="/about" data-link>About</a>
                  <a class="dropdown-item" href="/account" data-link>Account</a>
                </div>
          </li>
<!--      <li>&lt;!&ndash; Button trigger modal &ndash;&gt;-->
<!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">-->
<!--  Register-->
<!--</button></li>-->
       </ul>
  </div>
</nav>
${Register(props)}
${Login(props)}
    `;
}
