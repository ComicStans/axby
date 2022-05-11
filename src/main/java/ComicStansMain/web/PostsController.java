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
    private final BoardsRepository boardsRepository;
    private final PostsRepository postsRepository;

    @GetMapping
    private Collection<Post> getAllPosts(){
        return postsRepository.findAll();
    }

    @GetMapping("postsByBoard")
    private Collection<Post> getAllPostsByBoardId() {
//        System.out.println("This ID for that Board is ");
        return postsRepository.findAllByBoardId(boardsRepository.getById(1L));
    }
    @GetMapping("postsByAuthor")
    private Collection<Post> getAllPostsByUserId() {
        return postsRepository.findAllByAuthorId(usersRepository.getById(1L));
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost) {
        User author = usersRepository.findByUsername("wesleyb");
        newPost.setBoardId(boardsRepository.getById(1L));
        newPost.setAuthorId(author);
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
