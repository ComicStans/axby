package ComicStansMain.web;

import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/guildboards", headers = "Accept=application/json")
public class GuildBoardsController {
    private final GuildBoardsRepository gbr;
    private final GuildsRepository gr;

    @GetMapping()
    private Collection<GuildBoard> getAll() {
            return gbr.findAll();
    }

    @PostMapping
    private void createBoard(@RequestBody GuildBoard board) {
        board.setDateCreated(LocalDate.now());
        board.setGuild(gr.getById(1L));
        gbr.save(board);
    }

    @PutMapping("{id}")
    private void modifyBoard(@PathVariable Long id, @RequestBody GuildBoard board) {
        GuildBoard gb = gbr.getById(id);
        gb.setName(board.getName());
        gbr.save(gb);
    }

    @DeleteMapping("{id}")
    private void deleteBoard(@PathVariable Long id) {
        gbr.deleteById(id);
    }
}