//package ComicStansMain.web;
//
//import ComicStansMain.data.*;
//import lombok.AllArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.util.Collection;
//
//@CrossOrigin
//@AllArgsConstructor
//@RestController
//@RequestMapping(value = "api/posts", headers = "Accept=application/json")
//public class GuildBoardPostsController {
//    private final UsersRepository usersRepository;
//    private final GuildBoardPostsRepository gbpr;
//    private final GuildBoardsRepository gbr;
//
//    @GetMapping
//    private Collection<GuildBoardPost> getAllPosts(){
//        return gbpr.findAll();
//    }
//
//    @GetMapping("postsByGuildBoard")
//    private Collection<GuildBoardPost> getAllPostsByBoardId() {
////        System.out.println("This ID for that Board is ");
//        return gbpr.findAllByGuildBoardId(gbr.getById(1L));
//    }
//    @GetMapping("postsByAuthor")
//    private Collection<GuildBoardPost> getAllPostsByUserId() {
//        return gbpr.findAllByAuthorId(usersRepository.getById(1L));
//    }
//
//    @PostMapping
//    private void createPost(@RequestBody GuildBoardPost newPost) {
//        User author = usersRepository.findByUsername("wesleyb");
//        newPost.setGuildBoardId(gbr.getById(1L));
//        newPost.setAuthorId(author);
//        newPost.setPostTime(LocalDate.now());
////        newPost.setAuthorId(author.getId());
//        newPost.setPostType(GuildBoardPost.postType.ORIGINAL);
//        gbpr.save(newPost);
//    }
//    @PutMapping("{id}")
//    private void editPost(@PathVariable Long id, @RequestBody Post postToEdit) {
//        GuildBoardPost thisPost = gbpr.getById(id);
//        thisPost.setPostText(postToEdit.getPostText());
//        gbpr.save(thisPost);
//    }
//    @DeleteMapping("{id}")
//    private void deletePost(@PathVariable Long id) {
//        gbpr.deleteById(id);
//    }
//}
