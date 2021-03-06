import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import {getUser} from "../auth.js";
const URL = `${BASE_URL}/api/boards`;
export default function MessageBoards(props) {
    console.log(props);
    const loggedInUser = getUser();
    return buildBoardPage(props.boards, loggedInUser);
}
function buildBoardPage(boards, loggedInUser) {
    return `<main>
        <div class="container">
            <div class="row">
                <div class="col">
                <div class="titlePage">BOARDS</div>
                    <hr class="hr-title">
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
                                <label for="topicName" class="col-form-label" id="topic-title-label">Title</label>
                                <input type="text" class="form-control" id="topicName">
                              </div>
                              <div class="form-group">
                                <label for="description" class="col-form-label">Description:</label>
                                <textarea class="form-control" id="description"></textarea>
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
                               
      <div class="card" style="width: 69em;">
           <div class="card-header">
             <h1>TOPICS</h1>
           </div>
           <ul class="list-group list-group-flush">
            <div id="topic-container">

            ${buildBoardTopics(boards, loggedInUser)}

             </div>
     
           </ul>
         </div>
    
     <br>                                                       
     <hr>
        
                </div>
            </div>
        </div>
    </main>
    `
}
function buildBoardTopics(boards, loggedInUser) {
    return boards.map(board => {
        return `${buildBoardRow(board, loggedInUser)}`
    }).join('');
}

function buildBoardRow(board, loggedInUser) {
    return `<li class="list-group-item"><h1><span class="topic" id="topic-${board.id}" data-link>${board.name}</span></h1>
        <p><span id="post-description-${board.id}">${board.description}</span></p>
        ${buildBoardTopicEditButton(board, loggedInUser)}
        ${buildBoardTopicDeleteButton(board,loggedInUser)}
        </li>
    <!-- EDIT A BOARD TITLE AND DESCRIPTION MODAL                ------------------------------------------------------------------>
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
            <input type="hidden" value="${board.id}" id="edit-id">
                <div class="form-group">
                    <label for="EditTopicName" class="col-form-label" id="topic-title-label" data-link>Title</label>
                    <input type="text" class="form-control" id="EditTopicName" data-link>
                </div>
                <div class="form-group">
                    <label for="EditDescription" class="col-form-label">Description:</label>
                    <textarea class="form-control" id="EditDescription"></textarea>
                </div>
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="save-changes" data-dismiss="modal">Save Changes</button>
    </div>
</div>
</div>
</div>`;
}
function buildBoardTopicEditButton(board, loggedInUser) {
    if(loggedInUser.role !== 'ADMIN' && loggedInUser.userName !== board.creator.email) {
        return "";
    }
    return `<button type="button" class="btn edit-topic-button" data-toggle="modal" data-target="#edit-topic" id="edit-topic-${board.id}" data-id="${board.id}"><i class="fas fa-edit"></i></button>`;
}

function buildBoardTopicDeleteButton(board, loggedInUser) {
    if(loggedInUser.role !== 'ADMIN' && loggedInUser.userName !== board.creator.email) {
        return "";
    }
    return `<button type="button" class="btn delete-topic-button" id="delete-post-${board.id}" data-id="${board.id}"><i class="fas fa-trash-alt"></i></button>`
}

export function MessageBoardEvents() {
    createAddTopicListener();
    createDeleteTopicListeners();
    createEditTopicListener();
    createSaveChangesListener();
    viewBoardPost();
}
// Add a topic - works ----------------------->
function createAddTopicListener() {
    $("#create-topic").click(function () {
        const description = $("#description").val();
        const name = $("#topicName").val();
        console.log(description);
        console.log(name);
        const newBoardTopic = {
            name,
            description
        }
        const request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newBoardTopic)
        }
        fetch(URL, request)
            .then(res => {
                console.log(res.status);
                createView("/messageBoards")
            }).catch(error => {
            console.log(error);
            createView("/messageBoards");
        });
    })
}
// Edit topic - not working yet ---------------->
function createEditTopicListener() {
    $(".edit-topic-button").click(function () {
        const id = $(this).data("id");
        const oldName = $(`#topic-${id}`).text();
        $("#edit-id").val(id)
        console.log(oldName);
        const oldDescription = $(`#post-description-${id}`).text();
        // $("#add-topic-id").val(id);
        $("#EditTopicName").val(oldName);
        $("#EditDescription").val(oldDescription);
    });
}
function createSaveChangesListener() {
    $("#save-changes").click(function () {
        const description = $('#EditDescription').val();
        const name = $('#EditTopicName').val();
        const id = $('#edit-id').val();
        const savedChanges = {
            name,
            description
        }
        const request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(savedChanges)
        }
        fetch(URL + `/${id}`, request)
            .then(res => {
                console.log(res.status);
                createView("/messageBoards")
            }).catch(error => {
            console.log(error);
            createView("/messageBoards");
        });
    })
}
// Delete topic works ------>
function createDeleteTopicListeners() {
    $(".delete-topic-button").click(function () {
        const id = $(this).data("id");
        const request = {
            method: "DELETE",
            headers: getHeaders(),
        }
        fetch(URL + `/${id}`, request)
            .then(res => {
                console.log(res.status);
                createView("/messageBoards")
            }).catch(error => {
            console.log(error);
            createView("/messageBoards");
        });
    });
}
function viewBoardPost() {
    $('.topic').click(function () {
        var boardId = this.id
        console.log(boardId)
        boardId = boardId.replace("topic-", "")
        console.log(boardId)
        createView(`/boardView/api/boards/${boardId}`)
    })
}
