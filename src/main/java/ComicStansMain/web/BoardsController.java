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
public class BoardsController {
    private final BoardsRepository boardsRepository;
    private final UsersRepository usersRepository;

    @GetMapping
    private Collection<Board> getAll() {
        return boardsRepository.findAll();
    }

    @GetMapping("creator")
    private Collection<Board> findByCreator() {
        return boardsRepository.findAllByCreator(usersRepository.findByUsername("wesleyb"));
    }

    @PostMapping
    private void createBoard(@RequestBody Board board) {
        board.setCreator(usersRepository.getById(1L));
        board.setDateCreated(LocalDate.now());
        boardsRepository.save(board);
    }
}