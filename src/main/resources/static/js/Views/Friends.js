import {getHeaders} from "../auth.js";
import createView from "../createView.js";

export default function Friends(props) {
    return `<!DOCTYPE html>
<html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Register</title>
            </head>
<body>
<h1>Friends</h1>
<hr>

               <body>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#friends">
  Edit Friends
</button>

<!-- Modal -->
<div class="modal fade" id="friends" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Friends</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Friends List goes here (How do I call the list?)
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>




<!-- Guild Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#guild">
  Creat Guild
</button>

<!-- Guild Modal -->
<div class="modal fade" id="guild" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Guild</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Here is where your guild will go
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


<!-- FRIENDS/CONNECTION Button trigger modal -->
<button type="button" class="btn btn-primary" id="pendingRequests">
  Friends Requests
</button>

<!--  I NEED THESE LINES TO GENERATE FOR EVERY FRIEND REQUEST    -->
      <div id="acceptOrDecline">
        

      </div>
                  

               </body>
        </html>
`;

}

export function FriendsEvents() {
    FindAllRequests();
    AcceptRequest();
    DeclineRequest();
}

export function FindAllRequests() {
    $("#pendingRequests").click(function () {
        let requests = {
            method: "GET",
            headers: getHeaders()
        }
        fetch("http://localhost:8081/api/users/friends/search/me", requests)
            .then(response => {
            response.json().then(response=>{console.log(response)
                $("#acceptOrDecline").html("");
            response.forEach(connection =>{
                $("#acceptOrDecline").append(`<p id="requester-${connection.id}">${connection.requester.username}</p>

    <button type = "button" class= "btn btn-primary accept" id = "${connection.id}"> Accept </button>
    <button type="button"  class = "btn btn-primary decline" id="${connection.id}">Decline</button>`)
                })})
            })
            .catch(error => {
                console.log("ERROR: " + error);
                createView("/Error404")
            });
    })

}

export function AcceptRequest(props) {
    $("#accept").click(function () {
        let newConnection = {
            method: "PUT",
            headers: getHeaders()
        }
        fetch("http://localhost:8081/api/users/FriendsRequest/props", newConnection)
            .then(response => {
                createView("/")
            })
            .catch(createView("/friendsRequest"));
    })
}

export function DeclineRequest() {
    $("body").on("click", ".decline", function () {
        let id = this.id
        let decline = {
            method: "DELETE"
        }
        fetch(`http://localhost:8081/api/users/friends/${id}`, decline).then(function (){
            createView("/friends")
        })
    })
}