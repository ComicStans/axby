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
        $("#gameResults").html("")
        let game = $('#gameSearchBar').val()
        fetch(`http://localhost:8081/api/search?gameName=${game}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                for (let game of res) {
                    let html = `<ul class="list-group list-group-flush">`
                    game.involved_companies.forEach(company => {
                        html += `<li>${company.company.name}</li>`
                    })
                    html += `</ul>`
                    console.log(game.cover.url)
                    $("#gameResults").append(`<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${game.cover.url}" alt="${game.name}" width="20">
  <div class="card-body">
    <h5 class="card-title">${game.name}</h5>
    <p class="card-text">${game.summary}</p>
    ${html}
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`)
                }
            })
    })
}