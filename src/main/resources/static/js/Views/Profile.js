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
                        <div id="profileNameandImage">
                            <!--     AUTO GENERATED USERNAME OF NAVIGATED PROFILE ---WORKING        -->
                            <input class="username" disabled id="username" name="username" value="${props.user.username}" type="text"/><br>
                            <!--      NEED TO FIGURE OUT HOW TO HAVE USERS CUSTOM PROFILE PIC AUTO GENERATE          -->
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
                                Are you sure you want to block " " ?
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
                        <div id="userAbout">
                            <button type="button" class="btn " id="edit-button"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn " id="end-editing"><i class="far fa-save"></i></button>                               
                            <p id="aboutMe">
                           
                                I have a pen
                                I have an apple
                                Ah
                                Apple pen
                                I have a pen
                                I have pineapple
                                Ah
                                Pineapple pen
                                Apple pen
                                Pineapple pen
                                Ah
                                Pen Pineapple Apple Pen
                                Pen Pineapple Apple Pen
                            </p>
                        </div>
                           <h2> <a href="/friends" data-link style="color: #b70c95">Friends List</a></h2>
<!--                        <h2>Friend List</h2>-->
                            <ul class="friendList" >
                                <li id="list-item1"> <a href="#">Bob</a></li>
                                <li id="list-item2"> <a href="#">Micah</a></li>
                                <li id="list-item3"> <a href="#">Rachel</a></li>
                                <li id="list-item4"> <a href="#">Jenn</a></li>
                                <li id="list-item5"> <a href="#">Wesley</a></li>
                                <li id="list-item6"> <a href="#">David</a></li> 
                            </ul>
                        <h2>Wish List</h2>
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
                         <!-- Small button groups (default and split) -->
                            <div class="btn-group dropdown">
                              <button class="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuLink" type="button" data-toggle="dropdown" aria-expanded="false">
                                Game Category
                              </button>
                               <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                              </div>
                            </div>                            
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

export function friendRequest() {
    $(document).ready(function () {
        const request = {};
        $('#friendRequest').click(function () {
            request.method = "POST";
        })
    });
}