import {getHeaders, getUser, isLoggedIn} from "../auth.js";
import createView from "../createView.js";

const URL = 'http://localhost:8081/api/users/aboutme';
// import {user} from "./Register";
export default function Profile(props) {
    const user = getUser();
    const showButtonText = showOrHideButtons(props, user);
    return `
<head>    
    <title>Profile</title>
  </head>
       <body>
           <div class="container" style="margin-left: 1em;">
                <div class="row">
                    <div class="col">
                        <div id="profileNameandImage" class="username">
                            <!--     AUTO GENERATED USERNAME OF LOGGED IN PROFILE ---WORKING        -->
                            ${props.userProfile.username}
                            <!-- TODO:     NEED TO FIGURE OUT HOW TO HAVE USERS CUSTOM PROFILE PIC AUTO GENERATE          -->
                            <br>
                        </div>
                        <img class="img-circle" src="../../Images/NES.png" alt="NES controller">
                        <div id="request-and-block">
                            ${showButtonText}
                        </div>
                                    <!--  TODO: GET BLOCK BUTTON FUNCTIONAL ^^^^ -->
                    </div>
                </div>
                          
                        <br>
<!--               edit modal ---------------------------------------------------------------------------------------------->
                        <h2>About Me</h2>
                            <!--    TODO:     EDIT AND SAVE BUTTONS NOT WORKING   NEED TO GET WORKING            -->
                        <div id="userAbout">                              
                            <button type="button" class="btn" data-toggle="modal" id="edit-aboutMe-button" data-target="#exampleModal" data-whatever="@mdo" data-id="${props.userProfile.id}"><i class="fas fa-edit"></i>Edit About Me</button>                          
                                <p id="aboutMe">
                                    ${props.userProfile.aboutUserText ?? "New User to the website"}
                                </p>
                            </div>
                            
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit About Me</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <form>
                                       <input type="hidden" value="${props.userProfile.id}" id="edit-aboutMe-id">
                                      <div class="form-group">
                                        <label for="edit-aboutMe-text" class="col-form-label">About Me</label>
                                        <textarea class="form-control" id="edit-aboutMe-text"></textarea>
                                      </div>
                                    </form>
                                  </div>
                                  
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" id="cancel-edit-btn" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary" id="save-edit-btn" data-dismiss="modal">Save Changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            
                            
                            
<!--                --------------------------------------------------------------------------------------------            -->
                               <h2> <a href="/friends" data-link style="color: #ffffff">Friends List</a></h2>
  
                        <!--  GENERATES FRIENDS LIST          -->
                        <div class="friendList">
                        ${props.connection.map(connection => {
        return connection.dateAccepted != null && connection.recipient.email === user.userName ? (
                `<p id="friend-${connection.id}"> <a href="#">${connection.requester.username}</a></p><br>`)
            : ("")
    }).join('')
    }
                        ${props.connection.map(connection => {
        return connection.dateAccepted != null && connection.requester.email === user.userName ? (
                `<p id="friend-${connection.id}"> <a href="#">${connection.recipient.username}</a></p><br>`)
            : ("")
    }).join('')
    }
                        </div>
                            <h2>Wish List</h2>
                            <!--   GENERATES WISH LIST          -->
                            <div class="wishList">

                             ${props.userProfile.games.map(game => {
        return game.type === "WANNAPLAY" ? (
                `<div class="card" style="width: 18rem;">
                                          <img src="${game.art}" id="art-${game.id}">
                                                <div class="card-body">
                                                    <h5 id="name-${game.id}" style="color: black">${game.name}</h5>
                                                    <p id="review-${game.id}" style="color: black">${game.review ?? "No game reviews"}</p>
                                                    <button class="played-btn btn-primary" id="played-${game.id}" data-id="${game.id}">Played</button> <button class="review-btn btn-secondary" id="review-${game.id}" data-id="${game.id}">Review</button>
                                                    <button class=" delete-btn btn-secondary" id="delete-${game.id}" data-id="${game.id}">Delete</button>
                                                </div>
                                    </div>`)
            :("")}).join('')
    } 
                             </div>
           </div>
                    <div class="col" id="myCollection">
                         <h1>My Collection</h1>
                         <!-- TODO: THIS DROPDOWN BUTTON SHOULD ORGANIZE YOUR GAMES BASED ON OPTION YOU CHOOSE -->
                            <div class="btn-group dropdown">
                              <button class="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuLink" type="button" data-toggle="dropdown" aria-expanded="false">
                                SORT
                              </button>
                               <div class="dropdown-menu glow-dropdown" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Genre</a>
                                <a class="dropdown-item" href="#">Alphabetical</a>
                                <a class="dropdown-item" href="#">Reverse Alphabetical</a>
                              </div>
                            </div>  
                         <!--      TODO:      DISPLAY YOUR GAMES                          -->
                         ${props.userProfile.games.map(game => {
        return game.type === "PLAYED" ? (
                `<div class="card" style="width: 18rem;">
                                       <img src="${game.art}" id="art-${game.id}">
                                            <div class="card-body">
                                                <h5 id="name-${game.id}" style="color: black">${game.name}</h5>
                                                <p id="review-${game.id}" style="color: black">${game.review ?? "No game reviews"}</p>
                                                <button class="wannaplay-btn btn-primary" id="wannaplay-${game.id}" data-id="${game.id}">Wanna Play</button> <button class="review-btn btn-secondary" id="review-${game.id}" data-id="${game.id}">Review</button>
                                                <button class=" delete-btn btn-secondary" id="delete-${game.id}" data-id="${game.id}">Delete</button>
                                            </div>
                                </div>`)
            :("")}).join('')
    }
                    </div>
                    
                   
                </body>
    `;
}
export function ProfileEvents() {
    createEditAboutMeListener();
    createSaveEditChangesListener();
    addToPlayed();
    addToWannaPlay();
    deleteGame();


    $(document).ready(function () {
        $('#edit-button').click(function () {
            console.log(true)
            $('#aboutMe').attr('contenteditable', 'true')
        });
        $('#end-editing').click(function () {
            console.log(false)
            $('#aboutMe').attr('contenteditable', 'false')
        })
    })
}
export function FriendRequest(props) {
    $("#confirmRequest").click(function () {
        let connectionRequest = {
            recipient: {
                username: props.userProfile.username
                // ^^ uses (newConnection.getRecipient().getUsername()) from createConnection on ConnectionsController.java
            },
        }
        let newRequest = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(connectionRequest)
        }
        fetch(`${BASE_URL}/api/users/friends`, newRequest)
            .then(response => {
                createView("/")
            })
            .catch(createView("/profile"));
    })
}
function createEditAboutMeListener() {
    $("#edit-aboutMe-button").click(function () {
        const id = $(this).data("id");
        console.log(id)
        $("#edit-aboutMe-id").val(id)
        const oldAboutMeText = $(`#aboutMe`).text();
        $("#edit-aboutMe-text").val(oldAboutMeText);
    });
}
function createSaveEditChangesListener() {
    $("#save-edit-btn").click(function () {
        const aboutMeText = $('#edit-aboutMe-text').val();
        // const id = $('#edit-aboutMe-id').val();
        const savedAboutMeChanges = {
            aboutUserText:
            aboutMeText
        }
        const request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(savedAboutMeChanges)
        }
        fetch(URL , request)
            .then(res => {
                console.log(res.status);
                createView("/profile")
            }).catch(error => {
            console.log(error);
            createView("/profile");
        });
    })
}
function showOrHideButtons(props,user) {
    let profileEmail = props.userProfile.email;
    let loginEmail = user.userName;
    if(profileEmail === loginEmail) {
        return "";
    } else {
        return `<button type="button" id="confirmRequest" class="btn btn-primary">
                Friend Request
            </button>
            <button type="button" id="blockUser" class="btn btn-primary" data-target="#blockUser">
                Block
            </button>
        `;
    }
}

export function addToPlayed() {
    $(".played-btn").click(function () {
        console.log(this.id)
        const id = $(this).data("id")
        const game = {
            type: 'PLAYED'
        };
        let request = {
            method: 'PUT',
            body: JSON.stringify(game),
            headers: getHeaders()
        }
        fetch(`http://localhost:8081/api/games/${id}`, request)
            .then(function() {
                createView("/profile")
            });
    })
}

export function addToWannaPlay() {
    $(".wannaplay-btn").click(function () {
        console.log(this.id)
        const id = $(this).data("id")
        const game = {
            type: 'WANNAPLAY'
        };
        let request = {
            method: 'PUT',
            body: JSON.stringify(game),
            headers: getHeaders()
        }
        fetch(`http://localhost:8081/api/games/${id}`, request)
            .then(function() {
                createView("/profile")
            });
    })
}

export function deleteGame() {
    $(".delete-btn").click(function (){
        console.log(this.id)
        const id = $(this).data("id")
        let remove = {
            method: 'DELETE'
        }
        fetch(`http://localhost:8081/api/games/${id}`, remove)
            .then(function () {
                createView("/profile")
            })
    })
}
