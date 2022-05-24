import {getHeaders} from "../auth.js";
import createView from "../createView.js";

const URL = 'http://localhost:8081/api/posts';

export default function BoardView(props) {

    console.log(props)

    return `
    <div class="container">
        <div class="row">
            <div class="col">
        ${props.posts.map(post => {
              return `
                <p>${post.postText}</p>
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
                                    <input  type="submit" class="saveComment" value="Save Post"/>
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

}

function createAddPostListener() {
    $(".saveComment").click(function () {
        const postText = $("#post-textBox").val();
        const newPost = {
            postText
        }

        const request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newPost)
        }

        fetch(URL, request)
            .then(res => {
                console.log(res.status);
                createView("/boardView")
            }).catch(error => {
            console.log(error);
            createView("/boardView");
        });
    })
}