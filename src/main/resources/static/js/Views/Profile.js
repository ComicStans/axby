import {getHeaders} from "../auth.js";
import createView from "../createView.js";
import {isLoggedIn} from "../auth.js";
import {getUser} from "../auth.js";

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

                        <!-- ONLY DISPLAY IF YOU ARE ON SOMEONE ELSES PROFILE -->
                        <button type="button" id="confirmRequest" class="btn btn-primary" >
                         Friend Request
                        </button>
                        <button type="button" class="btn btn-primary" data-target="#blockUser">
                          Block
                        </button> 
                                    <!--  TODO: GET BLOCK BUTTON FUNCTIONAL ^^^^ -->
                              </div>
                            </div>
                          
                        <br>
                        <h2>About Me</h2>
                            <!--    TODO:     EDIT AND SAVE BUTTONS NOT WORKING   NEED TO GET WORKING            -->
                        <div id="userAbout">
                            <button type="button" class="btn " id="edit-button"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn " id="end-editing"><i class="far fa-save"></i></button>                               
                                <p id="aboutMe">

                                    ${props.user.aboutUserText ?? "New User to the website"}

                                </p>
                            </div>
                               <h2> <a href="/friends" data-link style="color: #ffffff">Friends List</a></h2>
  
                        <!--   TODO:        THIS NEEDS TO AUTO GENERATE FRIENDS LIST          -->
                        <div class="friendList">
                        ${props.connection.map(connection => {
                            return connection.dateAccepted != null && connection.recipient.email === user.userName ? (
                                `<p id="friend-${connection.id}"> <a href="#">${connection.requester.username}</a></p><br>`)
                            :("")}).join('')
                        }
                        ${props.connection.map(connection => {
                            return connection.dateAccepted != null && connection.requester.email === user.userName ? (
                                `<p id="friend-${connection.id}"> <a href="#">${connection.recipient.username}</a></p><br>`)
                            :("")}).join('')
                        }
                        </div>
                            <h2>Wish List</h2>
                            <!--    TODO:       THIS NEEDS TO AUTO GENERATE WISH LIST          -->
                            <div class="wishList">
                             ${props.user.games.map(game => {
                                 return game.type === "WANNAPLAY" ? (
                                     `<img src="${game.art}">
                                       <p id="name-${game.id}">${game.name}</p>
                                       <p id="review-${game.id}">${game.review ?? "No game reviews"}</p>`)
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
                         ${props.user.games.map(game => {
                            return game.type === "PLAYED" ? (
                                `<img src="${game.art}">
                                <p id="name-${game.id}">${game.name}</p>
                                <p id="review-${game.id}">${game.review ?? "No game reviews"}</p>`)
                            :("")}).join('')
                         }
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

/* WORKING ON GAMES WISHLIST
 ${props.game.map(game => {
    return game.status === WANNAPLAY ? (
        `<p id="games-${game.id}"><a href="#">${game.name}</a></p><br>`)
 :("")}).join('')
 } */