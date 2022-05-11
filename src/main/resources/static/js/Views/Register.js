import createView from "../createView.js";

export default function Register(props) {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="./Re">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Register</title>
            </head>
            <body>
                <h1>Register</h1>
                        <button id="myBtn">Open Modal</button>

                <form id="register-form">
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text"/>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email">
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password"/>
                    <button id="register-btn" type="button">Register</button>
                </form>
              <!-- The Modal -->
                    <div id="myModal" class="modal">
                    
                      <!-- Modal content -->
                      <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>Some text in the Modal..</p>
                      </div>
                    
                    </div>  
                
                    <script>
                        // Get the modal
                        let modal = document.getElementById("myModal");
                        
                        // Get the button that opens the modal
                        let btn = document.getElementById("myBtn");
                        
                        // Get the <span> element that closes the modal
                        let span = document.getElementsByClassName("close")[0];
                        
                        // When the user clicks the button, open the modal 
                        btn.onclick = function() {
                          modal.style.display = "block";
                        }
                        
                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function() {
                          modal.style.display = "none";
                        }
                        
                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function(event) {
                          if (event.target == modal) {
                            modal.style.display = "none";
                          }
                        }
                    </script>
                
            </body>
        </html>
`;
}

export function RegisterEvent(){
    $("#register-btn").click(function(){

        let newUser = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }

        console.log(newUser);

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }

        fetch("http://localhost:8081/api/users", request)
            .then(response => {
                console.log(response.status);
                createView("/");
            })

    })
}