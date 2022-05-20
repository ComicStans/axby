import createView from "../createView.js";
import {getHeaders} from "../auth.js";


const URL = 'http://localhost:8081/api/posts';

export default function MessageBoards(props) {
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
                                <input type="text" class="form-control" id="topic-title add-topic-name">
                              </div>
                              <div class="form-group">
                                <label for="description-text" class="col-form-label">Description:</label>
                                <textarea class="form-control" id="description-text add-topic-description"></textarea>
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
                     
                    
                    
      <div class="card" style="width: 69em;">
           <div class="card-header">
             TOPIC
           </div>
           <ul class="list-group list-group-flush">
            <div id="topic-container">
            
             ${props.posts.map(post => {

        return `
                 <li class="list-group-item"><h1 id="title-${post.id}"><a class="topic" href="/topicView" data-link>${post.name} - ${post.description}</a>
                 <button type="button" class="btn edit-topic-button" data-toggle="modal" data-target="#edit-topic" id="edit-topic-${post.id}" data-id="${post.id}"><i class="fas fa-edit"></i></button>
                 <button type="button" class="btn delete-topic-button" id="delete-post-${post.id}" data-id="${post.id}"><i class="fas fa-trash-alt"></i></button></h1></li>
                 
                 <div class="modal fade" id="edit-topic" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Topic</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div class="form-group">
                                <label for="topic-title" class="col-form-label" id="topic-title-label">Title</label>
                                <input type="text" class="form-control" id="topic-title add-topic-name">
                              </div>
                              <div class="form-group">
                                <label for="description-text" class="col-form-label">Description:</label>
                                <textarea class="form-control" id="description-text add-topic-description"></textarea>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="create-topic" data-dismiss="modal">Save Changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                 
                  `
    }).join('')}
             
             </div>
             
             
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

  export function BoardEvents() {
      createAddTopicListener();
      // createDeleteTopicListeners();
      createEditTopicListener();

  }
  // Add a topic - works ----------------------->
  function createAddTopicListener() {
      $("#create-topic").click(function () {
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

  // Edit topic - not working yet ---------------->
  function createEditTopicListener() {

      $(".edit-topic-button").click(function () {
          const id = $(this).data("id");
          const oldName = $(`#name-${id}`).html();
          const oldDescription = $(`#description-${id}`).text();
          $("#add-topic-id").val(id);
          $("#add-topic-name").val(oldName);
          $("#add-topic-description").val(oldDescription);
          autoPopulateFields();
      });
  }

  function autoPopulateFields(props){
      $('#topic-title').val(props.post.name)
  }

  // Delete topic - not working yet ------>
  // function createDeleteTopicListeners() {
  //     $(".delete-topic-button").click(function () {
  //         const id = $(this).data("id");
  //         const request = {
  //             method: "DELETE",
  //             headers: getHeaders(),
  //         }
  //
  //         fetch(`http://localhost:8081/api/boards/${id}`, request)
  //             .then(res => {
  //                  console.log(res.status);
  //                 createView("/boards")
  //             }).catch(error => {
  //              console.log(error);
  //             createView("/boards");
  //         });
  //
  //     });
  // }