package ComicStansMain.web;


import ComicStansMain.data.Game;
import ComicStansMain.data.GamesRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/games", headers = "Accept=application/json")
public class GamesController {
    private final GamesRepository gamesRepository;

    @GetMapping
    private Collection<Game> getAll(){
        return gamesRepository.findAll();
    }
    @GetMapping("companies")
    private List<Game> getGamesByCompany(@RequestParam String companies) {
        System.out.println(companies);
        return gamesRepository.findAllByCompanies(companies);
    }
    @GetMapping("name")
    private Game findByName(@RequestParam String name) {
        return gamesRepository.findByName(name);
    }

    @PostMapping
    private void createGame(@RequestBody Game game) {
        game.setReleaseDate(LocalDate.now());
        gamesRepository.save(game);
    }
    @PutMapping("{id}")
    private void editGame(@PathVariable long id, @RequestBody Game game) {
        Game editedGame = gamesRepository.getById(id);
        editedGame.setArt(game.getArt());
        gamesRepository.save(editedGame);
    }
    @DeleteMapping("{id}")
    private void deleteGame(@PathVariable long id) {
        gamesRepository.deleteById(id);
    }
}
