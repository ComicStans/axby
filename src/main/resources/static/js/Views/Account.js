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
            <h1>Sample User Inforamtion temp hard coded</h1>
        </header>
        <main>
            <div class="profile">
             <h3>Profile pic</h3>
             <img class="img-circle " src="https://randomuser.me/api/portraits/women/10.jpg" alt="Random user">
             <p class="profile-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; </p>
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
            <!-- On rows -->
<tr class="table-active">Hello</tr>

<tr class="table-primary">GoodBye</tr>
<tr class="table-secondary">...</tr>
<tr class="table-success">...</tr>
<tr class="table-danger">...</tr>
<tr class="table-warning">...</tr>
<tr class="table-info">...</tr>
<tr class="table-light">...</tr>
<tr class="table-dark">...</tr>

<!-- On cells (\`td\` or \`th\`) -->
<tr>
  <td class="table-active">Is </td>

  <td class="table-primary">there</td>
  <td class="table-secondary">color??</td>
  <td class="table-success">...</td>
  <td class="table-danger">...</td>
  <td class="table-warning">...</td>
  <td class="table-info">...</td>
  <td class="table-light">...</td>
  <td class="table-dark">...</td>
</tr>
            
            <hr>
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