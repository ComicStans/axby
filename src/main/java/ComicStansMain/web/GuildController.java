package ComicStansMain.web;

import ComicStansMain.data.Guild;
import ComicStansMain.data.GuildsRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/guild", headers = "Accept=application/json")
public class GuildController {
    private final GuildsRepository guildsRepository;

    @GetMapping
    private Collection<Guild> getAll(){
        return guildsRepository.findAll();
    }

    @GetMapping("name")
    private Guild findByName(@RequestParam String name){
        return guildsRepository.findByName(name);
    }
}
