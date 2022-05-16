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
@RequestMapping(value = "api/users/myconnections", headers = "Accept=application/json")
public class ConnectionsController {
    private ConnectionsRepository connectionsRepository;
    private UsersRepository usersRepository;

    @GetMapping("{userId}")
    public Collection<Connection> listMyConnections(@PathVariable Long userId) {
        return connectionsRepository.findAllByRequesterOrRecipient(userId);
    }

    @PostMapping
    public void createConnection(@RequestBody Connection newConnection) {
        newConnection.setRequester(newConnection.getRequester());
        newConnection.setRecipient(newConnection.getRecipient());
        newConnection.setDateRequested(LocalDate.now());
        connectionsRepository.save(newConnection);
    }

    @PutMapping("{id}")
    public void updateConnectionStatus(@PathVariable Long id, @RequestParam boolean accepted) {
        Connection conn = connectionsRepository.getById(id);
        LocalDate thisDate = LocalDate.now();
        if(accepted) {
            conn.setDateAccepted(thisDate);
        } else {
            conn.setDateRejected(thisDate);
        }
        connectionsRepository.save(conn);
    }

    @DeleteMapping("{id}")
    public void breakConnection(@PathVariable Long id) {
        connectionsRepository.deleteById(id);
    }
}
