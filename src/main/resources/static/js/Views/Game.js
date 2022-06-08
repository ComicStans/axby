import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function Games(props) {
    return `        
            <nav class="navbar bg-light">
                <input class="mr-sm-2 searchUsersName" type="text" id="gameSearchBar" placeholder="Search video games">
                <button class="btn btn-outline-success my-2 my-sm-0" id="gameSearchButton" type="button">Search</button>
            </nav>
                    <p class="titlePage">Games</p>
                       <hr class="hr-title">
                           <div id="gameResults"> </div>

    `
}

export function gameListeners() {
    populateGames()
    addToPlayed()
    addToWishList()
}

const populateGames = function () {
    $("#gameSearchButton").click(function () {
        $("#gameResults").html("")
        let game = $('#gameSearchBar').val()
        fetch(`${BASE_URL}/api/search?gameName=${game}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.length === 0) {
                    $("#gameResults").append('no results found')
                    return
                }
                for (let game of res) {
                    console.log(game.id)
                    let buttons = `<span class="btn btn-primary playButton" id="${game.id}">Played it</span>
                                    <span  class="btn btn-primary wishButton" id="${game.id}">Wanna play it</span>`
                    let html = `<h5>companies involved: </h5><p id="companies-${game.id}">`
                    game.involved_companies.forEach(company => {
                        html += `${company.company.name}, `
                    })
                    html = html.substr(0, html.length - 2);
                    html += `</p>`

                    let htmlg = `<h5>platforms: </h5><p id="platforms-${game.id}">`
                    game.platforms.forEach(platform => {
                        htmlg += `${platform.name}, `
                    })
                    htmlg = htmlg.substr(0, htmlg.length - 2);
                    htmlg += `</p>`
                    console.log(game.cover.url)
                    $("#gameResults").append(`<div class="card" style="width: 18rem;">
  <img class="card-img-top" id="cover-${game.id}" src="${game.cover.url}" alt="${game.name}" width="20">
  <div class="card-body" id="daCardBody">
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

const addToPlayed = function () {
    $("body").on("click", ".playButton", function () {
        $(this).off("click")
        console.log(this.id)
        let id = this.id
        let game = {
            art: $("#cover-" + id).attr("src"),
            companies: $("#companies-" + id).text(),
            platforms: $("#platforms-" + id).text(),
            summary: $("#summary-" + id).text(),
            name: $("#title-" + id).text(),
        }
        let request = {
            method: 'POST',
            body: JSON.stringify(game),
            headers: getHeaders()
        }
        fetch(`${BASE_URL}/api/games/add`, request)
            .then(res => alert("Added to played list"));
    })
}

const addToWishList = function () {
    $("body").on("click", ".wishButton", function () {
        $(this).off("click")
        console.log(this.id)
        let id = this.id
        let game = {
            art: $("#cover-" + id).attr("src"),
            companies: $("#companies-" + id).text(),
            platforms: $("#platforms-" + id).text(),
            summary: $("#summary-" + id).text(),
            name: $("#title-" + id).text(),
        }
        let request = {
            method: 'POST',
            body: JSON.stringify(game),
            headers: getHeaders()
        }
        fetch(`${BASE_URL}/api/games/wish`, request)
            .then(res => alert("Added to wishlist"));
    })
}