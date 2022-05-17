package ComicStansMain.web;

import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/boards", headers = "Accept=application/json")
public class GuildBoardsController {
    private final GuildBoardsRepository gbr;
    private final UsersRepository usersRepository;
    private final GamesRepository gamesRepository;

    @GetMapping("guildboards")
    private Collection<GuildBoard> getAll() {
        return gbr.findAll();
    }

    @GetMapping("guildboards")
    private GuildBoard findGuildBoardByName(@RequestParam String name) {
        return gbr.findByName(name);
    }

    @GetMapping
    private Collection<GuildBoard> findGuildBoardSearchPattern(@RequestParam String pattern) {
        return gbr.findAllByNameLike(pattern);
    }

    @GetMapping("creator")
    private Collection<GuildBoard> findByCreator() {
        return gbr.findAllByCreator(usersRepository.findByUsername("wesleyb"));
    }

    @PostMapping
    private void createBoard(@RequestBody GuildBoard board) {
        board.setGame(gamesRepository.getById(1L));
        board.setDateCreated(LocalDate.now());
        gbr.save(board);
    }
}