import createView from "../createView.js";

const URL = 'http://localhost:8081/api/account';

export default function Account(props) {
    console.log(props)
    return `
<head>
<title>Profile</title>    
</head>
<body class="account-body">
        <header>
            <h1>Sample User Photo temp hard coded</h1>
        </header>
        <main>
            <div class="profile">
             <h3>Profile pic</h3>
             <img class="img-circle " src="https://randomuser.me/api/portraits/women/10.jpg" alt="Random user"> <!--     hard code, need to change later        -->
            </div>
            <hr>
            <form id="register-form">
                <label for="username">Username</label>
                <input class="account-page" disabled id="username" name="username" value="${props.users.username}" type="text"/><br>
                <label for="email">Email</label>
                <input class="account-page" disabled id="email" name="email" type="email" value="${props.users.email}"><br>
                <label for="new-password">New Password</label>
                <input class="account-page" id="new-password" name="new-password" type="text" value=""/><br>
                <button id="change-password-button" type="button">Change Password</button>
            </form>
           
            </body>
            ${props.users.posts.map(post => {
        return `
<div class="card">
  <div class="card-header">
    ${post.title}
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>${post.content}</p>
    </blockquote>
  </div>
</div>`
    }).join('')}
        </main>
    `;
}

export function UserEvents() {
    $("#change-password-button").click(function() {
        const id = 1;
        let uriExtra = '/1/updatePassword';
        const newPassword = $("#new-password").val()

        const request = {
            method: "PUT"
        }
        fetch(`${URL}${uriExtra}?newPassword=${newPassword}`, request)
            .then(res => {
                console.log(`${request.method} SUCCESS: ${res.status}`);
            }).catch(error => {
            console.log(`${request.method} ERROR: ${error}`);
        }).finally(() => {
            createView("/account");
        });
    });
}