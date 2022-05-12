package ComicStansMain.web;

import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/playedlist", headers = "Accept=application/json")
public class PlayedListController {
    private final PlayedListsRepository playedListsRepository;
    private final UsersRepository usersRepository;
    private final GamesRepository gamesRepository;

    @GetMapping
    private Collection<PlayedList> findAll() {
        return playedListsRepository.findAll();
    }

    @GetMapping("{id}")
    private Optional<PlayedList> findByID(@PathVariable Long id) {
        return playedListsRepository.findById(id);
    }

    @PostMapping
    private void createList(@RequestBody PlayedList list) {
        list.setDateCreated(LocalDate.now());
        list.setUser(usersRepository.getById(1L));
        list.setGames(gamesRepository.findAll());
        playedListsRepository.save(list);
    }
}
