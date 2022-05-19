import createView from "../createView.js";
import {getHeaders} from "../auth.js";


const URL = 'http://localhost:8081/api/posts';

export default function BoardView(props) {
    return `
       
            <main>
                <div class="container">
                    <div class="row">
                        <div class="col">
                        <div id="boardViewTitle"><h1>"Super Mario"</h1></div>
                        
                            <div id="createTopicModal">
                            <button type="button" class="btn btn-primary" id="add-topic-button" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Create A Board</button>
                            
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">New Topic</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <form>
                                      <div class="form-group">
                                        <label for="topic-title" class="col-form-label" id="topic-title-label">Title</label>
                                        <input type="text" class="form-control" id="topic-title">
                                      </div>
                                      <div class="form-group">
                                        <label for="description-text" class="col-form-label">Description:</label>
                                        <textarea class="form-control" id="description-text"></textarea>
                                      </div>
                                    </form>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary" id="create-topic" data-dismiss="modal">Create Topic</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                            <hr>
                             
                            
                            
                             <div class="card" style="width: 18rem;">
                                  <div class="card-header">
                                    TOPIC
                                  </div>
                                  <ul class="list-group list-group-flush">
                                   
                                    <li class="list-group-item"><a class="topic" href="/topicView" data-link>cheats</a></li>
                                    <li class="list-group-item">easter eggs</li>
                                    <li class="list-group-item">general questions</li>
                                  </ul>
                                </div>
                           
                            <br>
                            <div id="posts-container">
                                    ${props.posts.map(post => {

                                    }).join('')}
                            </div>
                            
                            <hr>
                           
                            
                            
<!--                            <h3>Create A Board</h3>-->
<!--                            <form id="add-post-form">-->
<!--                                <div class="mb-3">-->
<!--&lt;!&ndash;                                    <input disabled type="text" class="form-control" id="add-post-id" value="0">&ndash;&gt;-->
<!--                                </div>-->
<!--                                <div class="mb-3">-->
<!--                                    <label for="add-post-title" class="form-label">Title</label>-->
<!--                                    <input type="text" class="form-control" id="add-post-title" placeholder="Post title">-->
<!--                                </div>-->
<!--                                <label for="add-post-content" class="form-label">Content</label>-->
<!--                                <textarea class="form-control" id="add-post-content" rows="3" placeholder="Post content"></textarea>-->
<!--                                -->
<!--                                <br>-->
<!--                                    &lt;!&ndash;           MIGHT CHANGE THESE BUTTONS            &ndash;&gt;-->
<!--                                <button id="clear-post-button" type="submit" class="btn btn-primary mb-3"-->
<!--                                        onclick="document.querySelector('#add-post-id').value = 0; document.querySelector('#add-post-title').value = ''; -->
<!--                                        document.querySelector('#add-post-content').value = '';"> Cancel </button>-->
<!--                                <button id="add-post-button" type="submit" class="btn btn-primary mb-3">Submit</button>-->
<!--                            </form>-->
                        </div>
                    </div>
                </div>
            </main>
    `;
}

        export function BoardEvents() {
            createAddTopicListener()

        }

function createAddTopicListener() {
    $("#create-topic").click(function (){
        const description = $("#description-text").val();
        const name = $("#topic-title").val();
        const newBoardTopic = {
            name,
            description
        }
        const request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newBoardTopic)
        }

        fetch("http://localhost:8081/api/boards", request)
            .then(res => {
                console.log(res.status);
                createView("/boardView")
            }).catch(error => {
            console.log(error);
            createView("/boardView");
        });
    })
}