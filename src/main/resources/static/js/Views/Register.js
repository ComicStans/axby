import createView from "../createView.js";

const countryList = ["United States", "United Kingdom", "Canada"]
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



<!--TODO: NEED TO HAVE SOME SORT OF CONFIRMATION THAT USER WAS REGISTERED -->
<!--TODO: NEED TO HAVE SOME SORT OF CONFIRMATION THAT PASSWORD AND USERNAME ARE OK -->
<!--TODO: NEED TO HAVE MORE REQUIRED INFO TO REGISTER (STARS NEXT TO REQUIRED FIELDS) -->

       <div class="container">
           <div class="row">
               <div class="col">
                   <p class="titlePage">Register</p>
                   <hr class="hr-title">

                       <form id="register-form" style="margin-left: 1em; margin-right: 1em; width: 70%">
                          <label for="newUsername">Username</label>
                           <input id="newUsername" name="username" type="text"/>
                             <div id="add-post-title-error" class="invalid-feedback">
                            Username must be non-blank.
                        </div>
                          <label for="email">Email</label>
                           <input id="email" name="email" type="email">
                          <label for="userPassword">Password</label>
                           <input id="userPassword" name="password" type="password"/>
                           <div id="add-post-content-error" class="invalid-feedback">
                            Password must be non-blank.
                        </div>
                <!--          <button id="register-btn" type="button">Register</button>-->
                          <button type="button" class="btn btn-primary" id="Create">Create</button> <br>  
                          <button type="button" class="btn btn-secondary" id="clearRegisterBtn" >Clear</button>
                          
                       </form>
                </div>
            </div>
        </div>
           
          
               </body>
        </html>
`;
}


export function user(){
    CreateUser();
    clearRegisterForm();
    createAddFormListeners();
    validatePost();
}

function CreateUser(){
    $("#Create").click(function (){
        if(!validatePost()) {
            return;
        }
        let newUser = {
            username: $("#newUsername").val(),

            email: $("#email").val(),
            password: $("#userPassword").val()
        }

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }
        fetch(`${BASE_URL}/api/users`, request)
            .then(response => {
                console.log(response.status);
                localStorage.setItem("justRegistered", true)
                createView("/login");
            })
    })
}

function clearRegisterForm() {

    $("#clearRegisterBtn").click(function () {
        $(':input', '#register-form')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);
    });
}

function createAddFormListeners() {
    $("#newUsername").keyup((event) => {
        validatePost();
    });
    $("#userPassword").keyup((event) => {
        validatePost();
    });
}

function validatePost() {
    // return true if post is valid else false
    const title = $("#newUsername").val();
    const content = $("#userPassword").val();
    let isFormOk = true;
    // valid title is non blank
    if(title.trim().length === 0) {
        // console.log("Title must be non-blank");
        $("#add-post-title").addClass("border border-danger");
        $("#add-post-title-error").show();
        isFormOk = false;
    } else {
        $("#add-post-title").removeClass("border border-danger");
        $("#add-post-title-error").hide();
    }
    // valid content is non-blank
    if(content.trim().length === 0) {
        $("#add-post-content").addClass("border border-danger");
        $("#add-post-content-error").show();
        isFormOk = false;
    } else {
        $("#add-post-content").removeClass("border border-danger");
        $("#add-post-content-error").hide();
    }
    return isFormOk;
}


// function validatePassword() {
//
// }