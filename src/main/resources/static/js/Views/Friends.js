import {getHeaders} from "../auth.js";
import createView from "../createView.js";
import {getUser} from "../auth.js";

export default function Friends(props) {
    return `<!DOCTYPE html>
<html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Register</title>
            </head>
<body>
    <div class="form-container">
        <form class="form">
            <nav class="navbar bg-light">
                <input class="form-control mr-sm-2 searchUsersName" type="search" id="searchBar" placeholder="Search users name" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" id="submit" type="submit">Search</button>
            </nav>
        </form>
    </div>
<h1 id="friendsTitle">Friends</h1>
<hr class="hr-title">

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#friends" id="editFriends">
  Edit Friends
</button>
<div id="friends-to-edit"></div>


<!-- Guild Button trigger modal -->
<!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#guild">-->
<!--  Create Guild-->
<!--</button>-->
<br>
<!-- Guild Modal -->
<!--<div class="modal fade" id="guild" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
<!--  <div class="modal-dialog" role="document">-->
<!--    <div class="modal-content">-->
<!--      <div class="modal-header">-->
<!--        <h5 class="modal-title" id="exampleModalLabel">Create Guild</h5>-->
<!--        <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--          <span aria-hidden="true">&times;</span>-->
<!--        </button>-->
<!--      </div>-->
<!--      <div class="modal-body">-->
<!--        Here is where your guild will go-->
<!--      </div>-->
<!--      <div class="modal-footer">-->
<!--        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
<!--        <button type="button" class="btn btn-primary">Save changes</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->


<button type="button" class="btn btn-primary" id="pendingRequests">
  Friends Requests
</button>
</div>
<div id="acceptOrDecline"></div>
</body>
        </html>
`;

}

export function FriendsEvents() {
    FindAllRequests();
    AcceptRequest();
    DeclineRequest();
    searchUsers();
    EditFriends();
}

export function FindAllRequests() {
    $("#pendingRequests").click(function () {
        let requests = {
            method: "GET",
            headers: getHeaders()
        }
        fetch(`${BASE_URL}/api/users/friends/search/me`, requests)
            .then(response => {
                response.json().then(response => {
                    console.log(response)
                    $("#acceptOrDecline").html("");
                    response.forEach(connection => {
                        if (connection.dateAccepted === null) {
                            $("#acceptOrDecline").append(`<div style=" margin-top: .5em; background-color: #431473; padding: 1em; color: #fff; border: thick double #6f11d1; max-width: 25em;"><p style="margin-top: .5em; color: #ebef00; font-family: 'VT323', monospace;font-size: xx-large;" id="requester-${connection.id}">${connection.requester.username}</p>
                        <button type = "button" class= "btn btn-primary accept" id = "${connection.id}"> Accept </button>
                            <button type="button"  class = "btn btn-primary decline " id="${connection.id}">Decline</button></div>`)
                        } else {
                            window.alert("You have no open Friend Requests.")
                        }
                    })
                })
            })
            .catch(error => {
                console.log("ERROR: " + error);
                createView("/Error404")
            });
    })

}

export function EditFriends() {
    $("#editFriends").click(function () {
        const user = getUser();
        let friends = {
            method: "GET",
            headers: getHeaders()
        }
        fetch(`${BASE_URL}/api/users/friends`, friends)
            .then(response => {
                response.json().then(response => {
                    console.log(response)
                    $("#friends-to-edit").html("");
                    response.forEach(connection => {
                        if (connection.dateAccepted != null && connection.recipient.email === user.userName) {
                            $("#friends-to-edit").append(`<div style=" margin-top: .5em; background-color: #431473; padding: 1em; color: #fff; border: thick double #6f11d1; max-width: 25em;"><p style="font-family: VT323, serif; font-size: xx-large" id="friend-${connection.id}">${connection.requester.username}</p>
                        <button type="button"  class = "btn btn-primary decline" id="${connection.id}">Unfriend</button></div><br>`)
                        } else if (connection.dateAccepted != null && connection.requester.email === user.userName) {
                            $("#friends-to-edit").append(`<div style=" margin-top: .5em; background-color: #431473; padding: 1em; color: #fff; border: thick double #6f11d1; max-width: 25em;"><p style="font-family: VT323, serif; font-size: xx-large" id="friend-${connection.id}">${connection.recipient.username}</p>
                        <button type="button"  class = "btn btn-primary decline" id="${connection.id}">Unfriend</button></div><br>`)
                        }
                    })
                })
            })
            .catch(error => {
                console.log("ERROR: " + error);
                createView("/Error404")
            });
    })

}

export function AcceptRequest(props) {
    $("body").on("click", ".accept", function () {
        let id = this.id
        let newConnection = {
            method: "PUT",
            headers: getHeaders()
        }
        fetch(`${BASE_URL}/api/users/friends/${id}`, newConnection)
            .then(function() {
                createView("/friends")
            })
            .catch(createView("/"));
    })
}

export function DeclineRequest() {
    $("body").on("click", ".decline", function () {
        let id = this.id
        let decline = {
            method: "DELETE"
        }
        fetch(`${BASE_URL}/api/users/friends/${id}`, decline)
            .then(function () {
            createView("/friends")
        })
    })
}
export function searchUsers() {
    $("#submit").on("click", function () {

        let id = this.id
        console.log(id)

        createView(`/userProfile/api/users/username?username=${$("#searchBar").val()}`)
    })


}