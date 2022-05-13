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


<!-- Modal -->
<!--<div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
<!--  <div class="modal-dialog" role="document">-->
<!--    <div class="modal-content">-->
<!--      <div class="modal-header">-->
<!--        <h5 class="modal-title" id="exampleModalLabel">Register</h5>-->
<!--        <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--          <span aria-hidden="true">&times;</span>-->
<!--        </button>-->
<!--      </div>-->
<!--      <div class="modal-body">-->
                         <h1>Register</h1>
                         <form id="register-form">
                            <label for="newUsername">Username</label>
                            <input id="newUsername" name="username" type="text"/>
                            <label for="email">Email</label>
                            <input id="email" name="email" type="email">
                            <label for="userPassword">Password</label>
                            <input id="userPassword" name="password" type="password"/>
<!--                            <button id="register-btn" type="button">Register</button>-->
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="Create">Create</button>
                         </form>
<!--      </div>-->
<!--      <div class="modal-footer">-->
<!--        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>-->
<!--        <button type="button" class="btn btn-primary" id="Create">Create</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->
               </body>
        </html>
`;
}

// export function RegisterEvent() {
//     $("#register-btn").click(function () {

        // let newUser = {
        //     username: $("#username").val(),
        //     email: $("#email").val(),
        //     password: $("#password").val()
        // }

        // console.log(newUser);
        //
        // let request = {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(newUser)
        // }

//         fetch("http://localhost:8081/api/users", request)
//             .then(response => {
//                 console.log(response.status);
//                 createView("/");
//             })
//
//     })
// }
export function user(){
    CreateUser();
}

function CreateUser(){
    $("#Create").click(function (){
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