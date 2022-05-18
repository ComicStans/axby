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
//@RequestMapping(value = "api/guildboards", headers = "Accept=application/json")
//public class GuildBoardsController {
//    private final GuildBoardsRepository gbr;
//    private final GamesRepository gamesRepository;
//
//    @GetMapping()
//    private Collection<GuildBoard> getAll(@RequestParam String pattern) {
//        if (pattern == null) {
//            return gbr.findAll();
//        }
//        return gbr.findAllByNameLike(pattern);
//    }
//
//    @PostMapping
//    private void createBoard(@RequestBody GuildBoard board) {
//        board.setGame(gamesRepository.getById(1L));
//        board.setDateCreated(LocalDate.now());
//        gbr.save(board);
//    }
//}