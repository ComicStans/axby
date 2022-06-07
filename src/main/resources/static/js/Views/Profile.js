import {getHeaders} from "../auth.js";
import createView from "../createView.js";
import {isLoggedIn} from "../auth.js";
import {getUser} from "../auth.js";

const URL = 'http://localhost:8081/api/users/aboutme';

// import {user} from "./Register";


export default function Profile(props) {
    const user = getUser();
    console.log(props)
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
                        <img class="img-circle " src="../../Images/NES.png" alt="NES controller">
                        <div id="request-and-block">
                        ${showOrHideButtons(props,user)}
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
  
                        <!--   TODO:        THIS NEEDS TO AUTO GENERATE FRIENDS LIST          -->
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
                            <!--    TODO:       THIS NEEDS TO AUTO GENERATE WISH LIST          -->
                            <div class="wishList">  
                             ${props.userProfile.games.map(game => {
                                 return game.type === "WANNAPLAY" ? (
                                    `<div class="card" style="width: 18rem;">
                                          <img src="${game.art}" id="art-${game.id}">
                                                <div class="card-body">
                                                    <h5 id="name-${game.id}" style="color: black">${game.name}</h5>
                                                    <p id="review-${game.id}" style="color: black">${game.review ?? "No game reviews"}</p>
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
                         <!--      TODO:         THIS AREA NEEDS TO BE CREATED TO DISPLAY YOUR GAMES                                       -->
                         ${props.userProfile.games.map(game => {
                            return game.type === "PLAYED" ? (
                                `<div class="card" style="width: 18rem;">
                                       <img src="${game.art}" id="art-${game.id}">
                                            <div class="card-body">
                                                <h5 id="name-${game.id}" style="color: black">${game.name}</h5>
                                                <p id="review-${game.id}" style="color: black">${game.review ?? "No game reviews"}</p>
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

        fetch("http://localhost:8081/api/users/friends", newRequest)
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


export function showOrHideButtons(props,user) {
    let profileEmail = props.userProfile.email;
    let loginEmail = user.userName;
    if (profileEmail === loginEmail) {
        return "";
    } else {
        return
        `<div style="margin-top: .5em; background-color: #431473; padding: 1em; color: #fff; border: thick double #6f11d1; max-width: 25em;"><p style="margin-top: .5em; color: #ebef00; font-family: 'VT323', monospace;font-size: xx-large;" id="requester-${connection.id}">${connection.requester.username}</p>
            <button type="button" id="confirmRequest" class="btn btn-primary">
                Friend Request
            </button>
            <button type="button" className="btn btn-primary" data-target="#blockUser">
                Block
            </button>   
        </div>`;
    }
}

/* WORKING ON GAMES WISHLIST
 ${props.game.map(game => {
    return game.status === WANNAPLAY ? (
        `<p id="games-${game.id}"><a href="#">${game.name}</a></p><br>`)
 :("")}).join('')
 } */