export default function Home(props) {

    fetch("http://localhost:8081/api/search?gameName=tetris")
        .then(res=>res.json())
        .then(res=>console.log(res))
    return`<head>
        <title></title>
    </head>
    <header>
    </header>
    <body>
    <h2 style="padding: 1em 0 1em 2em">  Where organizing your video games has never been easier...</h2>
    <div style="display: flex; justify-content: center; ">   
        <img src="../../Images/finished_Project_Logo.png" alt="logo">
    </div> 
</body>
    `

}
