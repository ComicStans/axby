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
@RequestMapping(value = "api/guilds", headers = "Accept=application/json")
public class GuildsController {
    private final GuildsRepository guildsRepository;
    private final UsersRepository usersRepository;

    @GetMapping
    private Collection<Guild> findAllGuilds() {
        return guildsRepository.findAll();
    }

    @GetMapping("creator")
    private Collection<Guild> findAllByCreator(@RequestParam String userName) {
        return guildsRepository.findAllByCreator(usersRepository.findByUsername(userName));
    }

    @GetMapping("guildname")
    private Guild getGuild(@RequestParam String guildname) {
        return guildsRepository.findByName(guildname);
    }

    @GetMapping("searchPattern")
    private Collection<Guild> getAllGuildsLike(@RequestParam String searchPattern) {
        return guildsRepository.findAllByNameLike(searchPattern);
    }

    @PostMapping
    private void createGuild(@RequestBody Guild newGuild) {
        newGuild.setCreator(usersRepository.findByEmail("bob@bob.com"));
        newGuild.setDateCreated(LocalDate.now());
        guildsRepository.save(newGuild);
    }

    @PutMapping("{id}")
    private void modifyBoard(@PathVariable Long id, @RequestBody Guild guildToEdit) {
        Guild thisGuild = guildsRepository.getById(id);
        thisGuild.setName(guildToEdit.getName());
        thisGuild.setMotto(guildToEdit.getMotto());
        guildsRepository.save(thisGuild);
    }

    @DeleteMapping("{id}")
    private void deleteBoard(@PathVariable Long id) {
        guildsRepository.deleteById(id);
    }
}