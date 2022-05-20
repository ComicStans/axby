package ComicStansMain.web;

import ComicStansMain.data.Connection;
import ComicStansMain.data.ConnectionsRepository;
import ComicStansMain.data.User;
import ComicStansMain.data.UsersRepository;
import lombok.AllArgsConstructor;
import org.apache.tomcat.jni.Local;
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

    @GetMapping("{userId}")
    public Collection<Connection> listMyConnections(@PathVariable Long userId, @RequestParam Long requester) {
        if (requester == userId) {
            return connectionsRepository.findAllByRequesterOrRecipient(userId);
        }
        return connectionsRepository.findAllByRecipient(userId);
    }

    @GetMapping("requester/{id}")
    public Collection<Connection> findAllByRequester(@PathVariable Long id) {
        return connectionsRepository.findAllByRequester(usersRepository.getById(id));
    }

    @PostMapping
    public void createConnection(@RequestBody Connection newConnection) {
        newConnection.setRequester(usersRepository.getById(newConnection.getRequester().getId()));
        newConnection.setRecipient(usersRepository.getById(newConnection.getRecipient().getId()));
        newConnection.setDateRequested(LocalDate.now());
        connectionsRepository.save(newConnection);
    }

    @PutMapping("{id}")
    public void updateConnectionStatus(@PathVariable Long id) {
        Connection conn = connectionsRepository.getById(id);
        LocalDate thisDate = LocalDate.now();
        conn.setDateAccepted(thisDate);
        connectionsRepository.save(conn);
    }

    @DeleteMapping("{id}")
    public void breakConnection(@PathVariable Long id) {
        connectionsRepository.deleteById(id);
    }
}
