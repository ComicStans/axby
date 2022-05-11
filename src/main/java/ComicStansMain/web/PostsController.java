package ComicStansMain.web;

import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/posts", headers = "Accept=application/json")
public class PostsController {
    private final UsersRepository usersRepository;
//    private final BoardsRepository boardsRepository;
    private final PostsRepository postsRepository;

    @GetMapping
    private Collection<Post> getAllPosts(){
        return postsRepository.findAll();
    }

    @GetMapping("postsByBoard")
    private Collection<Post> getAllPostsByBoardId(@RequestParam Long boardId) {
        System.out.println("This ID for that Board is " + boardId);
        return postsRepository.findAllByBoardId(boardId);
    }
    @GetMapping("postsByAuthor")
    private Collection<Post> getAllPostsByUserId(@RequestParam Long authorId) {
        return postsRepository.findAllByAuthorId(authorId);
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost, String newPostType) {
        Date postDate = new Date();
        User author = usersRepository.findByUsername("dbc-hou");
        newPost.setPostTime(LocalDate.now());
//        newPost.setAuthorId(author.getId());
        newPost.setPostType(Post.postType.ORIGINAL);
        postsRepository.save(newPost);
    }
    @PutMapping("{id}")
    private void editPost(@PathVariable long id, @RequestBody Post postToEdit) {
        Post thisPost = postsRepository.getById(id);
        thisPost.setPostText(postToEdit.getPostText());
        postsRepository.save(thisPost);
    }
    @DeleteMapping("{id}")
    private void deletePost(@PathVariable long id) {
        postsRepository.deleteById(id);
    }
}
