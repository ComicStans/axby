package ComicStansMain.web;

import ComicStansMain.data.PlayedList;
import ComicStansMain.data.PlayedListsRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/playedlist", headers = "Accept=application/json")
public class PlayedListController {
    private final PlayedListsRepository playedListsRepository;

    @GetMapping
    private Collection<PlayedList> findAll() {
        return playedListsRepository.findAll();
    }
}
