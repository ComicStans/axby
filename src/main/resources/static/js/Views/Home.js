export default function Home(props) {

    fetch("http://localhost:8081/api/search?gameName=tetris")
        .then(res=>res.json())
        .then(res=>console.log(res))
    return`<head>
        <title></title>
    </head>
    <header>
        <h1>HOME</h1>
    </header>
    
    `

}
