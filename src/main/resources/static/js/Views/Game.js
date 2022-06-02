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
    addToPlayed()
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
                    console.log(game.id)
                    let buttons = `<span class="btn btn-primary playButton" id="savePlayed-${game.id}">Played it</span>
                                    <span  class="btn btn-primary wishButton" id="Wishlist-${game.id}">Wanna play it</span>`
                    let html = `<h5>companies involved: </h5><p id="companies-${game.id}">`
                    game.involved_companies.forEach(company => {
                        html += `${company.company.name}, `
                    })
                    html = html.substr(0, html.length-2);
                    html += `</p>`
                    let htmlg = `<h5>platforms: </h5><p id="platforms-${game.id}">`
                    game.platforms.forEach(platform => {
                        htmlg += `${platform.name}, `
                    })
                    htmlg = htmlg.substr(0, html.length-2);
                    htmlg += `</p>`
                    console.log(game.cover.url)
                    $("#gameResults").append(`<div class="card" style="width: 18rem;">
  <img class="card-img-top" id="cover-${game.id}" src="${game.cover.url}" alt="${game.name}" width="20">
  <div class="card-body">
    <h5 class="card-title" id="title-${game.id}">${game.name}</h5>
    <p class="card-text" id="summary-${game.id}">Summary: ${game.summary}</p>
    <p class="card-text" id="storyline-${game.id}">Storyline: ${game.storyline ?? "No storyline listed"}</p>
    ${html}
    ${htmlg}
    ${buttons}
  </div>
</div>`)
                }
            })
    })
}

const addToPlayed = function() {
    $("body").on("click", ".playButton", function () {
        console.log(this.id)
    })
}