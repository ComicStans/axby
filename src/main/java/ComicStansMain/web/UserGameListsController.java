package ComicStansMain.web;

import ComicStansMain.data.*;
import ComicStansMain.dto.UserGameListTransfer;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
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
    private List<UserGameList> getAllListings(){
        return uglRepository.findAll();
    }

    private UserGameList getOneListing(Long id){
            return uglRepository.getById(id);
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
    private void createListing(@RequestBody UserGameListTransfer newUserGameList) {
//        User author = usersRepository.getById(2L);
//        Game gameReviewed = gamesRepository.getById(1L);
        UserGameList newUGL = new UserGameList();
        newUGL.setGame(gamesRepository.getById(newUserGameList.getGameId()));
        newUGL.setUser(usersRepository.getById(newUserGameList.getUserId()));
        newUGL.setDateUpdated(LocalDate.now());
        newUGL.setStatus(newUserGameList.getStatus());
        newUGL.setReview(newUserGameList.getReview());
        System.out.println(newUGL.getReview());
        uglRepository.save(newUGL);
    }
    @PutMapping("{id}")
    private void editListing(@PathVariable Long id, @RequestBody UserGameList userGameListToEdit) {
        UserGameList thisUserGameList = uglRepository.getById(id);
        thisUserGameList.setReview(userGameListToEdit.getReview());
        thisUserGameList.setStatus(userGameListToEdit.getStatus());
        uglRepository.save(thisUserGameList);
    }
    @DeleteMapping("{id}")
    private void deleteListing(@PathVariable Long id) {
        uglRepository.deleteById(id);
    }
}
