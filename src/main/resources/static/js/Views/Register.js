import createView from "../createView.js";

export default function Register(props) {
    return `
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Register</title>
            </head>
               <body>
                     <!--Creates the popup body-->
                 <div class="popup-overlay">
                      <!--Creates the popup content-->
                 <div class="popup-content">
                     <h1>Register</h1>
                     <form id="register-form">
                        <label for="username">Username</label>
                        <input id="username" name="username" type="text"/>
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email">
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password"/>
                        <button id="register-btn" type="button">Register</button>
                     </form>
        
                            <!--popup's close button-->
                            <button class="close">Close</button> </div>
                        </div>
                        <!--Content shown when popup is not displayed-->
                        <h2>jQuery Pop-Up Example</h2>
                        <button class="open">Open</button>
        
               </body>
        </html>
`;
}

export function RegisterEvent() {
    $("#register-btn").click(function () {

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
    //appends an "active" class to .popup and .popup-content when the "Open" button is clicked
    $(".open").on("click", function () {
        $(".popup-overlay, .popup-content").addClass("active");
    });

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked
    $(".close, .popup-overlay").on("click", function () {
        $(".popup-overlay, .popup-content").removeClass("active");
    });

}