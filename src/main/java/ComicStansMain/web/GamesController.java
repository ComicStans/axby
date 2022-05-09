package ComicStansMain.web;

import ComicStansMain.data.Game;
import ComicStansMain.data.GamesRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Collection;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping(value = "api/games", headers = "Accept=application/json")
public class GamesController {
    private final GamesRepository gamesRepository;

    @GetMapping
    private Collection<Game> getAll() {
        return gamesRepository.findAll();
    }
    @PostMapping
    private void createGame(@RequestBody Game game) {
//        gotta learn how to convert utc to local date, for now all games will have been created today
        game.setRelease_date(LocalDate.now());
        gamesRepository.save(game);
    }
}
