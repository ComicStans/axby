
export default function Profile(props) {
    return `
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
   

    <title>Hello, world!</title>
  </head>
      <body>
       
            <h1>Profile</h1>
            
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h1>User Name</h1>
                        <img>
                        <button type="button" class="btn btn-outline-dark">Add Friend</button>
                        <button type="button" class="btn btn-outline-danger">Block User</button>
                        <h2>About Me</h2>
                            <p id="lyrics">
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
                            <ul class="list" id="list1">
                                <li id="list-item1"> <a href="#">Bob</a></li>
                                <li id="list-item2"> <a href="#">Micah</a></li>
                                <li id="list-item3"> <a href="#">Rachel</a></li>
                                <li id="list-item4"> <a href="#">Jenn</a></li>
                                <li id="list-item5"> <a href="#">Wesley</a></li>
                                <li id="list-item6"> <a href="#">David</a></li>
                                
                            </ul>
                        <h2>Wish List</h2>
                            <ul class="list" id="list1">
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                <!-- Optional JavaScript; choose one of the two! -->
            
                <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
                <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                
            
                <!-- Option 2: Separate Popper and Bootstrap JS -->
                <!--
                <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js" integrity="sha384-VHvPCCyXqtD5DqJeNxl2dtTyhF78xXNXdkwX1CZeRusQfRKp+tA7hAShOK/B/fQ2" crossorigin="anonymous"></script>
                -->
                <script>
                 "use strict";
                 
                 $(document).ready(function() {

                 // INSERT JAVASCRIPT CODE SAMPLE HERE
                 
                 $('.btn').click(function () {
                     $(this).
                 })
                 
            
                    
            
               
            
                
            
                });
                 
                 
                 
                 
                 
                 
                 
                 
                 
                </script>
      </body>
    `;
}
