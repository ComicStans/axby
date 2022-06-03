import {getHeaders} from "../auth.js";
import createView from "../createView.js";
// import {user} from "./Register";

export default function Profile(props) {
    console.log(props)
    return `
<head>    
    <title>Profile</title>
  </head>
       <body>
           <div class="container">
                <div class="row">
                    <div class="col">
                            <!--  TODO:    USERNAME AND PROFILENAME NOT ALIGNING!!!!              -->
                        <div id="profileNameandImage" class="username">
                            <!--     AUTO GENERATED USERNAME OF LOGGED IN PROFILE ---WORKING        -->
                            ${props.user.username}
                            <!-- TODO:     NEED TO FIGURE OUT HOW TO HAVE USERS CUSTOM PROFILE PIC AUTO GENERATE          -->
                            <img class="img-circle " src="https://randomuser.me/api/portraits/women/10.jpg" alt="Random user">
                            <br>
                        </div>
                        <!-- Button trigger for add friend modal -->
                        <button type="button" id="confirmRequest" class="btn btn-primary" >
                         Friend Request
                        </button>
                        <!-- Modal -->
<!--                        <div class="modal fade" id="friendRequest" tabindex="-1" role="dialog" aria-labelledby="friendRequestCenterTitle" aria-hidden="true">-->
<!--                          <div class="modal-dialog modal-dialog-centered" role="document">-->
<!--                            <div class="modal-content">-->
<!--                              <div class="modal-header">-->
<!--                                <h5 class="modal-title" id="confirm">Confirm Friend Request</h5>-->
<!--                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--                                  <span aria-hidden="true">&times;</span>-->
<!--                                </button>-->
<!--                              </div>-->
<!--                              <div class="modal-body">-->
<!--                                Send friend request?-->
<!--                              </div>-->
<!--                              <div class="modal-footer">-->
<!--                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>-->
<!--                                <button type="button" class="btn btn-primary confirm">Confirm</button>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#blockUser">
                          Block
                        </button>
                        <!-- Modal -->
                        <div class="modal fade" id="blockUser" tabindex="-1" role="dialog" aria-labelledby="blockUserTitle" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Block User</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body"> 
                                Are you sure you want to block ${props.user.username} ?  
       <!--  TODO: GET BLOCK BUTTON FUNCTIONAL ^^^^ AND THE DISPLAY NAME BEING GENERTAED RIGHT NOW IS THE NAME OF THE CURRENT LOGGED-IN USER-->
                                You will no longer see their profile, boards or receive messages from them.
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary">Confirm</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br>
                        <h2>About Me</h2>
                            <!--    TODO:     EDIT AND SAVE BUTTONS NOT WORKING   NEED TO GET WORKING            -->
                        <div id="userAbout">
                            <button type="button" class="btn " id="edit-button"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn " id="end-editing"><i class="far fa-save"></i></button>                               
                                <p id="aboutMe">
                                    ${props.user.aboutUserText}
                                </p>
                        </div>
                           <h2> <a href="/friends" data-link style="color: #b70c95">Friends List</a></h2>

                    <!--   TODO:        THIS NEEDS TO AUTO GENERATE FRIENDS LIST          -->
                            ${props.connection.map(connection => {
                                return connection.dateAccepted != null ? (
                                    `<p id="friend-${connection.id}"> <a href="#">${connection.requester.username}</a></p><br>`)
                                :("")}).join('')
                            }

                        <h2>Wish List</h2>
                        <!--    TODO:       THIS NEEDS TO AUTO GENERATE WISH LIST          -->
                            
                    </div>
                   
                    <div class="col" id="myCollection">
                         <h1>My Collection</h1>
                         <!-- TODO: THIS DROPDOWN BUTTON SHOULD ORGANIZE YOUR GAMES BASED ON OPTION YOU CHOOSE -->
                            <div class="btn-group dropdown">
                              <button class="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuLink" type="button" data-toggle="dropdown" aria-expanded="false">
                                SORT
                              </button>
                               <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Genre</a>
                                <a class="dropdown-item" href="#">Alphabetical</a>
                                <a class="dropdown-item" href="#">Reverse Alphabetical</a>
                              </div>
                            </div>  
                         <!--      TODO:         THIS AREA NEEDS TO BE CREEATED TO DISPLAY YOUR GAMES                                       -->
                    </div>
                </div>
            </div>
                </body>
    `;
}

export function ProfileEvents() {
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

export function FriendRequest(props){
    $("#confirmRequest").click(function (){
        let connectionRequest = {
            recipient: {
                username: props.user.username
                // ^^ uses (newConnection.getRecipient().getUsername()) from createConnection on ConnectionsController.java
            },

        }
        let newRequest = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(connectionRequest)
        }

    fetch("http://localhost:8081/api/users/friends" , newRequest)
        .then(response => {
            createView("/")
        })
        .catch(createView("/profile"));
    })
}

/* WORKING ON GAMES WISHLIST
 ${props.game.map(game => {
    return game.status === WANNAPLAY ? (
        `<p id="games-${game.id}"><a href="#">${game.name}</a></p><br>`)
 :("")}).join('')
 } */

//FINDING HOW TO FIX FRIENDS LIST
// ${props.connection.map(connection => {
//     return connection.dateAccepted != null && user.email === connection.recipient.email ? (
//        `<p id="friend-${connection.id}"> <a href="/userProfile?username=${location.href.split('=')[1]}">${connection.requester.username}</a></p><br>`)
//     : ("")}).join('')
// }