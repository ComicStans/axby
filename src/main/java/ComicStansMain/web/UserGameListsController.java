package ComicStansMain.web;

import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/lists", headers = "Accept=application/json")

public class UserGameListsController {
    private final UsersRepository usersRepository;
    private final GamesRepository gamesRepository;
    private final UserGameListsRepository uglRepository;

    @GetMapping
    private List<UserGameList> getAllReviews(){
        return uglRepository.findAll();
    }

    //User argument hardcoded in the next to Get methods; this will change, of course.
    @GetMapping("listingsByAuthorPlayed")
    private Collection<UserGameList> getAllListingsByUserPlayed() {
        return uglRepository.findAllByUserAndStatus(usersRepository.getById(1L),"PLAYED");
    }
    @GetMapping("listingsByAuthorWannaPlay")
    private Collection<UserGameList> getAllListingsByUserWannaPlay() {
        return uglRepository.findAllByUserAndStatus(usersRepository.getById(1L),"WANNAPLAY");
    }

    @PostMapping
    private void createListing(@RequestBody UserGameList newUserGameList, String review_text) {
        User author = usersRepository.getById(2L);
        Game gameReviewed = gamesRepository.getById(1L);
        newUserGameList.setGame(gameReviewed);
        newUserGameList.setUser(author);
        newUserGameList.setDateUpdated(LocalDate.now());
        newUserGameList.setReview(review_text);
        uglRepository.save(newUserGameList);
    }
    @PutMapping("{id}")
    private void editReview(@PathVariable Long id, @RequestBody UserGameList userGameListToEdit) {
        UserGameList thisUserGameList = uglRepository.getById(id);
        thisUserGameList.setReview(userGameListToEdit.getReview());
        uglRepository.save(thisUserGameList);
    }
    @DeleteMapping("{id}")
    private void deleteReview(@PathVariable Long id) {
        uglRepository.deleteById(id);
    }
}
