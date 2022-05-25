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
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#friendRequest">
                         Friend Request
                        </button>
                        <!-- Modal -->
                        <div class="modal fade" id="friendRequest" tabindex="-1" role="dialog" aria-labelledby="friendRequestCenterTitle" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="confirm">Confirm Friend Request</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                Send friend request?
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary confirm">Confirm</button>
                              </div>
                            </div>
                          </div>
                        </div>
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
                                return connection.dateAccepted != null ?(
                                    `<p id="friend-${connection.id}"> <a href="#">${connection.requester.username}</a></p><br>`)
                                :("")}).join('')
                                
                            }

                        <h2>Wish List</h2>
                        <!--    TODO:       THIS NEEDS TO AUTO GENERATE WISH LIST          -->
                            <ul class="wishList" >
                                <li id="list-item1"> <a href="#">Sonic</a></li>
                                <li id="list-item2"> <a href="#">Super Mario</a></li>
                                <li id="list-item3"> <a href="#">Aladdin</a></li>
                                <li id="list-item4"> <a href="#">Duck hunter</a></li>
                                <li id="list-item5"> <a href="#">Street Fighter</a></li>
                                <li id="list-item6"> <a href="#">Lion King</a></li>
                            </ul>
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
//   THIS CODE IS NOT FINISHED YET
export function friendRequest() {
    $(document).ready(function () {
        const request = {
            //requester id
        };
        $('#friendRequest').click(function () {
            request.method = "POST";
            //headers: {"Content-Type": "application/json"},
            //body: JSON.stringify(newUser
        })
        fetch("http://localhost:8081/api/friends", request) //location to send data
            .then(response => {
                console.log(response.status);
                //what do I put here? ("/");
            })
    });
}