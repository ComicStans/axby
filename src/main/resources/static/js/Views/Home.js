export default function Home(props) {

    fetch("http://localhost:8081/api/search?gameName=tetris")
        .then(res=>res.json())
        .then(res=>console.log(res))
    return`<head>
        <title></title>
    </head>
    <header>
    <img src="../../../Images/finished_Project_Logo.png" alt="games_on_tvStand">
        <h1>HOME</h1>
    </header>
    
    `

}
