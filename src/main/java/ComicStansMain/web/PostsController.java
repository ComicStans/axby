package ComicStansMain.web;

import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
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
    private final BoardsRepository boardsRepository;
    private final PostsRepository postsRepository;

    @GetMapping
    private Collection<Post> getAllPosts(){
        return postsRepository.findAll();
    }

    @GetMapping("board/{id}")
    private Collection<Post> getAllPostsByBoardId(@PathVariable Long id) {
//        System.out.println("This ID for that Board is ");
        Board board = boardsRepository.findById(id).get();
        return board.getPosts();
    }
    @GetMapping("postsByAuthor")
    private Collection<Post> getAllPostsByUserId() {
        return postsRepository.findAllByAuthorId(usersRepository.getById(1L));
    }

    @PostMapping("board/{id}")
    private void createPost(@RequestBody Post newPost, @PathVariable Long id, OAuth2Authentication auth) {
        User author = usersRepository.findByEmail(auth.getName());
        newPost.setBoardId(boardsRepository.findById(id).get());
        newPost.setAuthorId(author);
        newPost.setPostTime(LocalDate.now());
//        newPost.setAuthorId(author.getId());
        newPost.setPostType(Post.postType.ORIGINAL);
        postsRepository.save(newPost);
    }
    @PutMapping("{id}")
    private void editPost(@PathVariable Long id, @RequestBody Post postToEdit) {
        Post thisPost = postsRepository.getById(id);
        thisPost.setPostText(postToEdit.getPostText());
        postsRepository.save(thisPost);
    }
    @DeleteMapping("{id}")
    private void deletePost(@PathVariable Long id) {
        postsRepository.deleteById(id);
    }
}
