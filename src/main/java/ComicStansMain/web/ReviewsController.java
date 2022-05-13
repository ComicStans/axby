package ComicStansMain.web;

import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/lists", headers = "Accept=application/json")
public class ReviewsController {
    private final UsersRepository usersRepository;
    private final GamesRepository gamesRepository;
    private final ReviewsRepository reviewsRepository;

    @GetMapping
    private List<Review> getAllReviews(){
        return reviewsRepository.findAll();
    }

//User argument hardcoded in the next to Get methods; this will change, of course.
    @GetMapping("reviewsByAuthor")
    private Collection<Review> getAllReviewsByUserPlayed() {
        return reviewsRepository.findAllByUserAndStatus(usersRepository.findByUsername("wesleyb"),"PLAYED");
    }
    @GetMapping("reviewsByAuthor")
    private Collection<Review> getAllReviewsByUserWannaPlay() {
        return reviewsRepository.findAllByUserAndStatus(usersRepository.findByUsername("wesleyb"),"WANNAPLAY");
    }

    @PostMapping
    private void createReview(@RequestBody Review newReview, String review_text) {
        User author = usersRepository.findByUsername("wesleyb");
        Game gameReviewed = gamesRepository.getById(1L);
        newReview.setGame(gameReviewed);
        newReview.setUser(author);
        newReview.setDateUpdated(LocalDate.now());
        newReview.setReview(review_text);
        reviewsRepository.save(newReview);
    }
    @PutMapping("{id}")
    private void editReview(@PathVariable Long id, @RequestBody Review reviewToEdit) {
        Review thisReview = reviewsRepository.getById(id);
        thisReview.setReview(reviewToEdit.getReview());
        reviewsRepository.save(thisReview);
    }
    @DeleteMapping("{id}")
    private void deleteReview(@PathVariable Long id) {
        reviewsRepository.deleteById(id);
    }
}
