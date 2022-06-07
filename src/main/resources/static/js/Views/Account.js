import createView from "../createView.js";
import {getHeaders, getUser} from "../auth.js";




export default function Account(props) {
    console.log(props)
    return `
<head>
<title>Profile</title>    
</head>
<body class="account-body">
        <header>
            <h1></h1>
        </header>
        <main>
             <img class="img-circle accountImg profile-img" src="../../Images/NES.png" alt="NES controller"> <!--     hard code, need to change later        -->
            <hr>
            <form id="register-form">
            <input type="hidden" id="hiddenId" value="${props.users.id}">
                <label for="username">Username</label>
                <input class="account-page" disabled id="username" name="username" value="${props.users.username}" type="text"/><br>
                <label for="email">Email</label>
                

                
                <input class="account-page" disabled id="email" name="email" type="email" value="${props.users.email}"><br>
                <label for="new-password">New Password</label>
                <input class="account-page" id="new-password" name="new-password" type="text" value="${props.users.password}"/><br>
                <button id="change-password-button" type="button">Change Password</button>
            </form>
           
            </body>
            
        </main>
    `;
}

export function UserEvents() {
    $("#change-password-button").click(function() {
        const id = $("#hiddenId").val();
        const newPassword = $("#new-password").val()

        const request = {
            method: "PUT",
            headers: getHeaders()
        }
        fetch(`http://localhost:8081/api/users/password?newPassword=${newPassword}`, request)
            .then(res => {
                console.log(`${request.method} SUCCESS: ${res.status}`);
            }).catch(error => {
            console.log(`${request.method} ERROR: ${error}`);
        }).finally(() => {
            createView("/account");
        });
    });
}