import {getHeaders} from "../auth.js";
import createView from "../createView.js";

const URL = 'http://localhost:8081/api/posts/board/';

export default function BoardView(props) {
    // var boardId = (typeof props.boardView[0].boardId.id === "undefined") ? 2: props.boardView[0].boardId.id
    console.log(props)

    return `
    <div class="container">
        <div class="row">
            <div class="col">
            
             <div class="card" style="width: 69em;">
    <div class="card-header">
       <h1>${props.boardView.name} - ${props.boardView.description}</h1>
    </div>
    <ul class="list-group list-group-flush">
        <div id="posts-container">

            ${props.boardView.posts.map(post => {
        return `

            <li class="list-group-item"><h3><span class="post" id="post-${post.id}" data-link>${post.postText}</span>
                <button type="button" class="btn edit-post-button" data-toggle="modal" data-target="#edit-post" id="edit-post-${post.id}" data-id="${post.id}"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn delete-post-button" id="delete-post-${post.id}" data-id="${post.id}"><i class="fas fa-trash-alt"></i></button></h3><br>
                  <h5>Created by: <a href="#">${post.authorId.username}</a></h5></li>

            <!-- EDIT POST TEXT MODAL                ------------------------------------------------------------------>
            <div class="modal fade" id="edit-post" tabindex="-1" aria-labelledby="examplePostModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="examplePostModalLabel">Edit Post</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <input type="hidden" value="${post.id}" id="edit-post-id">
                                <div class="form-group">
                                    <label for="EditPostText" class="col-form-label">Post:</label>
                                    <textarea class="form-control" id="EditPostText"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="saveChanges" data-dismiss="modal">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
       `
          }).join('')
    }
        <li class="list-group-item">
            <div id="b_news">
                <form method="post" action="">

                    <div class="creat-post-content">
                        <div class="container">
                            <form method="post" action="">
                                <div class="row">
                                    <div class="form-group">
                                        <textarea id="post-textBox" class="text-box" rows="6" cols="50"  placeholder="Post text here......" required></textarea>
                                    </div>
                                </div>
                                <div class="row" style="margin-top:20px;">
                                    <input  type="submit" class="saveComment" id="${props.boardView.id}" value="Save Post">
                                    <input type="submit" value="Cancel" class="create-post-cancel">
                                </div>
                            </form>
                        </div>
                    </div>
                </form>
            </div>
        </li>
            </div>
        </div>
    </div>
     `

}


export function BoardViewEvents() {
    createAddPostListener();
    createEditPostListener();
    createSavePostChangesListener();
    createDeletePostListener();

}

function createAddPostListener() {
    $(".saveComment").click(function () {
        const postText = $("#post-textBox").val();
        const boardId = this.id
        const newPost = {

            postText
        }

        const request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newPost)
        }

        fetch(URL + boardId, request)
            .then(res => {
                console.log(res.status);
                createView(`/boardView/api/boards/${boardId}`)
            }).catch(error => {
            console.log(error);
            createView(`/boardView/api/boards/${boardId}`);
        });
    })
}

// Edit topic - not working yet ---------------->
function createEditPostListener() {

    $(".edit-post-button").click(function () {
        const id = $(this).data("id");
        console.log(id)
        $("#edit-post-id").val(id)
        const oldPostText = $(`#post-${id}`).text();
        $("#EditPostText").val(oldPostText);

    });

}


function createSavePostChangesListener() {

    $("#saveChanges").click(function () {
        var boardId = $(".saveComment").attr("id");
        const postText = $('#EditPostText').val();
        const id = $('#edit-post-id').val();


        const savedChanges = {
            postText
        }

        const request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(savedChanges)
        }

        fetch(`http://localhost:8081/api/posts/${id}`, request)
            .then(res => {
                console.log(res.status);
                createView(`/boardView/api/boards/${boardId}`)
            }).catch(error => {
            console.log(error);
            createView(`/boardView/api/boards/${boardId}`);
        });
    })

}


function createDeletePostListener() {
    $(".delete-post-button").click(function () {
      var boardId = $(".saveComment").attr("id");
        console.log(boardId);
        const id = $(this).data("id");
        const request = {
            method: "DELETE",
            headers: getHeaders(),
        }

        fetch( `http://localhost:8081/api/posts/${id}`, request)
            .then(res => {
                console.log(res.status);
                createView(`/boardView/api/boards/${boardId}`)
            }).catch(error => {
            console.log(error);
            createView(`/boardView/api/boards/${boardId}`);
        });

    });
}