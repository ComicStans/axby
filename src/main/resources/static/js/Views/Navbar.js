export default function Navbar(props) {
    return `
<head>    
<title></title></head>
        <nav>
            <a href="/" data-link>Home</a>
            <a href="/marketPlace" data-link>Market Place</a>
            <a href="/messageBoards" data-link>Message Boards</a>
            <a href="/profile" data-link>Profile</a>
            <a href="/about" data-link>About</a>
            <a href="/friends" data-link>Friends</a>
            <a href="/login" data-link>Login</a>
            <a href="/register" data-link>Register</a>
            <a href="/account" data-link>Account</a>
        </nav>
    `;
}
