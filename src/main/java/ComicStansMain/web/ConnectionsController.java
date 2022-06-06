package ComicStansMain.web;

import ComicStansMain.data.Connection;
import ComicStansMain.data.ConnectionsRepository;
import ComicStansMain.data.User;
import ComicStansMain.data.UsersRepository;
import lombok.AllArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Collection;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/users/friends", headers = "Accept=application/json")
public class ConnectionsController {
    private ConnectionsRepository connectionsRepository;
    private UsersRepository usersRepository;

    @GetMapping("search")
    public Collection<Connection> listConnections(@RequestBody User user) {
        Collection<Connection> results = connectionsRepository.findAllByRecipient(usersRepository.findByUsername(user.getUsername()));
        results.addAll(connectionsRepository.findAllByRequester(usersRepository.findByUsername(user.getUsername())));
        return results;
    }

    @GetMapping("search/me")
    public Collection<Connection> listMyConnections(OAuth2Authentication auth) {
        return connectionsRepository.findAllByRecipient(usersRepository.findByEmail(auth.getName()));

    }

    @GetMapping
    private Collection<Connection> findAll(OAuth2Authentication auth) {
        return connectionsRepository.findAll();
    }

    @GetMapping("requester/{id}")
    public Collection<Connection> findAllByRequester(@PathVariable Long id) {
        return connectionsRepository.findAllByRequester(usersRepository.getById(id));
    }

    @PostMapping
    public void createConnection(@RequestBody Connection newConnection, OAuth2Authentication auth) {
        newConnection.setRequester(usersRepository.findByEmail(auth.getName()));
        newConnection.setRecipient(usersRepository.findByUsername(newConnection.getRecipient().getUsername()));
        newConnection.setDateRequested(LocalDate.now());
        connectionsRepository.save(newConnection);
    }

    @PutMapping("{id}")
    public void updateConnectionStatus(@PathVariable Long id) {
        Connection conn = connectionsRepository.getById(id);
        conn.setDateAccepted(LocalDate.now());
        connectionsRepository.save(conn);
    }

    @DeleteMapping("{id}")
    public void breakConnection(@PathVariable Long id) {
        connectionsRepository.deleteById(id);
    }
}
