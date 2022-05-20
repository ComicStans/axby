package ComicStansMain.web;
import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
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
    private void createBoard(@RequestBody Board board, OAuth2Authentication auth) {
        board.setCreator(usersRepository.findByEmail(auth.getName()));
        board.setDateCreated(LocalDate.now());
        boardsRepository.save(board);
    }

    @PutMapping("{id}")
    private void modifyBoard(@PathVariable Long id, @RequestBody Board boardToEdit) {
        Board thisBoard = boardsRepository.getById(id);
        thisBoard.setName(boardToEdit.getName());
        thisBoard.setDescription(boardToEdit.getDescription());
        boardsRepository.save(thisBoard);
    }

    @DeleteMapping("{id}")
    private void deleteBoard(@PathVariable Long id) {
        boardsRepository.deleteById(id);
    }
}