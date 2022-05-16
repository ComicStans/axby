
export default function Profile(props) {
    return `
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   
    <title>Profile!</title>
    <style>
        .img-circle {
    border-radius: 100%;
    border: 4px solid ;
}  
    </style>
  </head>
      <body>
       
            <h1>Profile</h1>
            
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h1 class="displayUsername">User Name</h1>
                        <img class="img-circle " src="https://randomuser.me/api/portraits/women/10.jpg" alt="Random user">
                        <br>
                        <button type="button" class="btn btn-outline-dark addFriend">Add Friend</button>
                        <button type="button" class="btn btn-outline-danger blockUser">Block User</button>
                        <br>
                        <h2>About Me</h2>
<!--                        <button type="button" class="btn editAboutMeBtn" onclick='setP()'><i class="fas fa-edit"></i></button>-->
                            <input type='button' onclick='setP()' value='Edit' id='bt' />
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
                            
                        <h2>Friend List</h2>
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
                                <li id="list-item3"> <a href="#">Aladin</a></li>
                                <li id="list-item4"> <a href="#">Duck hunter</a></li>
                                <li id="list-item5"> <a href="#">Street Fighter</a></li>
                                <li id="list-item6"> <a href="#">Lion King</a></li>
                            </ul>
                    </div>
                   
                    <div class="col">
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
    
    
    
    
                <script>
                  $(document).ready(function () {
                    $('#bt').click(function () {
                      $('#theEle')
                              .attr('contenteditable', 'true')
                              .focus();
                    });
                  });
                </script>
    
    
    
    
    
    
    
    
    
               
            
               
                
                
            
          
              
                
                 
                 
                 
                 
                 
                 
                 
                 
                
      </body>
    `;
}
