import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function Games(props) {
    return `
    <input type="text" id="gameSearchBar"> 
    <button type="button" id="gameSearchButton">Search</button>
    <div id="gameResults">
    
</div>
    `
}

export function gameListeners() {
    populateGames()
}

const populateGames = function() {
    $("#gameSearchButton").click(function () {
        let game = $('#gameSearchBar').val()
        fetch(`http://localhost:8081/api/search?gameName=${game}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                for (let game of res) {
                    $("#gameResults").append(game.name)
                }
            })    //this is just to test the API call
    })
}