package ComicStansMain.web;

import ComicStansMain.data.*;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
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
        User theCreator = usersRepository.findByEmail("bob@bob.com");
        Collection<Guild> theGuilds = theCreator.getGuilds();
        newGuild.setCreator(theCreator);
        newGuild.setDateCreated(LocalDate.now());
        theGuilds.add(newGuild);
        theCreator.setGuilds(theGuilds);
        guildsRepository.save(newGuild);
        usersRepository.save(theCreator);
    }

    @PutMapping("{id}")
    private void modifyGuild(@PathVariable Long id, @RequestBody Guild guildToEdit) {
        Guild thisGuild = guildsRepository.getById(id);
        thisGuild.setName(guildToEdit.getName());
        thisGuild.setMotto(guildToEdit.getMotto());
        guildsRepository.save(thisGuild);
    }

    @PutMapping("newMember/{id}")
    private void addGuildMember(@PathVariable Long id, @RequestBody Guild thisGuild) {
        User userToAdd = usersRepository.getById(id);
        Collection<Guild> myGuilds = userToAdd.getGuilds();
        myGuilds.add(guildsRepository.getById(thisGuild.getId()));
        userToAdd.setGuilds(myGuilds);
        usersRepository.save(userToAdd);
    }

    @DeleteMapping("{id}")
    private void deleteGuild(@PathVariable Long id) {
        guildsRepository.deleteById(id);
    }
}