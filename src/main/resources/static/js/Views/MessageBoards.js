import createView from "../createView.js";
import {getHeaders} from "../auth.js";


const URL = 'http://localhost:8081/api/posts';

export default function MessageBoards(props) {
    return `
        <header>
            <h1>My Blogs</h1>
        </header>
        <main>
            <h3>This is my Blog</h3>
            <br>
            <div id="posts-container">
                ${props.posts.map(post => { 
                    return `
<div class="card" style="margin-bottom: 2em;">
    <h4 class="card-header" style="background-color: #bdade8">
        <span id="title-${post.id}">${post.title}</span>
    </h4>
    <div class="card-body">
        <p id="content-${post.id}" class="card-text">${post.content}</p>
    </div>
    <div class="card-footer text-muted" style="background-color: #bdade8">            
        <span><a href="#" class="edit-post-button" data-id="${post.id}">Edit</a></span>
        <span><a href="#" class="delete-post-button" data-id="${post.id}">Delete</a></span>
    </div>  
</div>`;
    }).join('')}
            </div>
            <hr>
            <h3>Add a Post</h3>
            <form id="add-post-form">
                <div class="mb-3">
                    <input disabled type="text" class="form-control" id="add-post-id" value="0">
                </div>
                <div class="mb-3">
                    <label for="add-post-title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="add-post-title" placeholder="Post title">
                </div>
                <label for="add-post-content" class="form-label">Content</label>
                <textarea class="form-control" id="add-post-content" rows="3" placeholder="Post content"></textarea>
                </div>
                <br>
                    <!--           MIGHT CHANGE THESE BUTTONS            -->
                <button id="clear-post-button" type="submit" class="btn btn-primary mb-3"
                        onclick="document.querySelector('#add-post-id').value = 0; document.querySelector('#add-post-title').value = ''; 
                        document.querySelector('#add-post-content').value = '';"> Cancel </button>
                <button id="add-post-button" type="submit" class="btn btn-primary mb-3">Submit</button>
            </form>
        </main>
    `;
}

export function PostEvents() {
    createAddPostListener();
    createEditPostListeners();
    createDeletePostListeners();
}

function createAddPostListener() {
    $("#add-post-button").click(function() {
        const newPost = {
            title: $("#add-post-title").val(),
            content: $("#add-post-content").val()
        }
        const id = $("#add-post-id").val();
        const request = {};
        let uriExtra = "";
        if(id > 0) {
            // newPost.id = id;
            request.method = "PUT";
            uriExtra = `/${id}`;
            console.log("Ready to update this post:");
        } else {
            // newPost.id = 99999;
            request.method = "POST";
            console.log("Ready to add this post:");
        }
        request.headers = {
            'Content-Type': 'application/json'
        };
        request.body = JSON.stringify(newPost);
        fetch(`${URL}${uriExtra}`, request)
            .then(res => {
                console.log(`${request.method} SUCCESS: ${res.status}`);
            }).catch(error => {
            console.log(`${request.method} ERROR: ${error}`);
        }).finally(() => {
            createView("/posts");
        });
    });
}

function createEditPostListeners() {
    $(".edit-post-button").click(function() {
        const id = $(this).data("id");
        const oldTitle = $(`#title-${id}`).html();
        const oldContent = $(`#content-${id}`).text();
        $("#add-post-id").val(id);
        $("#add-post-title").val(oldTitle);
        $("#add-post-content").val(oldContent);
    });
}

function createDeletePostListeners() {
    $(".delete-post-button").click(function() {
        const id = $(this).data("id");
        console.log("Ready to delete the post with id " + id);

        const request = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(`${URL}/${id}`, request)
            .then(res => {
                console.log("DELETE SUCCESS: " + res.status);
            }).catch(error => {
            console.log("DELETE ERROR: " + error);
        }).finally(() => {
            createView("/posts");
        });
    });
}