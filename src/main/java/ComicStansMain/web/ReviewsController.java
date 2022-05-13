//package ComicStansMain.web;
//
//import ComicStansMain.data.*;
//import lombok.AllArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.util.Collection;
//import java.util.List;
//
//@CrossOrigin
//@AllArgsConstructor
//@RestController
//@RequestMapping(value = "api/lists", headers = "Accept=application/json")
//public class UserGameListsController {
//    private final UsersRepository usersRepository;
//    private final GamesRepository gamesRepository;
//    private final UserGameListsRepository uglRepository;
//
//    @GetMapping
//    private List<UserGameList> getAllReviews(){
//        return reviewsRepository.findAll();
//    }
//
////User argument hardcoded in the next to Get methods; this will change, of course.
//    @GetMapping("reviewsByAuthor")
//    private Collection<UserGameList> getAllReviewsByUserPlayed() {
//        return reviewsRepository.findAllByUserAndStatus(usersRepository.findByUsername("wesleyb"),"PLAYED");
//    }
//    @GetMapping("reviewsByAuthor")
//    private Collection<UserGameList> getAllReviewsByUserWannaPlay() {
//        return reviewsRepository.findAllByUserAndStatus(usersRepository.findByUsername("wesleyb"),"WANNAPLAY");
//    }
//
//    @PostMapping
//    private void createReview(@RequestBody UserGameList newUserGameList, String review_text) {
//        User author = usersRepository.findByUsername("wesleyb");
//        Game gameReviewed = gamesRepository.getById(1L);
//        newUserGameList.setGame(gameReviewed);
//        newUserGameList.setUser(author);
//        newUserGameList.setDateUpdated(LocalDate.now());
//        newUserGameList.setReview(review_text);
//        reviewsRepository.save(newUserGameList);
//    }
//    @PutMapping("{id}")
//    private void editReview(@PathVariable Long id, @RequestBody UserGameList userGameListToEdit) {
//        UserGameList thisUserGameList = reviewsRepository.getById(id);
//        thisUserGameList.setReview(userGameListToEdit.getReview());
//        reviewsRepository.save(thisUserGameList);
//    }
//    @DeleteMapping("{id}")
//    private void deleteReview(@PathVariable Long id) {
//        reviewsRepository.deleteById(id);
//    }
//}
