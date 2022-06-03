import {isLoggedIn} from "../auth.js";

export default function Home(props) {
    console.log(props)
    var welcomeMessage = "";
    if (isLoggedIn()  ) {
        welcomeMessage = "Welcome " + props.user.username + "!"

    }

    fetch("http://localhost:8081/api/search?gameName=tetris")
        .then(res=>res.json())
        // .then(res=>console.log(res))    //this is just to test the API call
    return`<head>
        <title></title>
    </head>
    <header>
    </header>
    <body>
    <h2  style="padding: 1em 0 1em 2em; color #121a52 !important; text-align: center">  Where organizing your video games has never been easier...</h2>
    <h3>${welcomeMessage}</h3>
    <div style="display: flex; justify-content: center; ">   
        <img src="../../Images/finished_Project_Logo.png" alt="logo">
    </div> 
</body>
    `

}
