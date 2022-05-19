import createView from "../createView.js";
import {getHeaders} from "../auth.js";


const URL = 'http://localhost:8081/api/posts';

export default function MessageBoards(props) {
    return `
        <header>
            <h1>My Blogs</h1>
        </header>
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col">
                             <h3>Popular Game Boards</h3>
                             <hr>
                            <div class="card" style="width: 69em;">
                              
                              <div class="card-header">
                                Board   Topics  Msgs 
                              </div>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item"><a class="board" href="/boardView" data-link>Super Mario</a></li>                                
                                <li class="list-group-item">Sonic</li>
                                <li class="list-group-item">Duck Hunter</li>
                              </ul>
                            </div>
                            <br>
                           
                            <hr>
                            
                        </div>
                    </div>
                </div>
            </main>
    `;
}

    export function PostEvents() {
        createAddPostListener();
        createEditPostListeners();
        createDeletePostListeners();
    }
// ADD A POST   -------------------------------------->
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
// EDIT A POST   -------------------------------------->
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
// DELETE A POST   -------------------------------------->
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