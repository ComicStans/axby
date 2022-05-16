package ComicStansMain.web;

import ComicStansMain.data.Connection;
import ComicStansMain.data.ConnectionsRepository;
import ComicStansMain.data.User;
import ComicStansMain.data.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/users/connections", headers = "Accept=application/json")
public class ConnectionsController {
    private ConnectionsRepository connectionsRepository;
    private UsersRepository usersRepository;

    @GetMapping
    public Collection<Connection> listMyConnections(User thisUser) {
        return connectionsRepository.findAllByRequesterOrRecipient(thisUser);
    }

    @PostMapping
    public void createConnection(@RequestBody Connection newConnection) {
        newConnection.setRequester(usersRepository.getById(2L));
        newConnection.setRecipient(usersRepository.getById(5L));
        newConnection.setDateRequested(LocalDate.now());
        connectionsRepository.save(newConnection);
    }

    @PutMapping
    public void updateConnectionStatus(@PathVariable Long id, LocalDate thisDate, boolean accepted) {
        Connection conn = connectionsRepository.getById(id);
        thisDate = LocalDate.now();
        if(accepted) {
            conn.setDateAccepted(thisDate);
        } else {
            conn.setDateRejected(thisDate);
        }
        connectionsRepository.save(conn);
    }

    @DeleteMapping
    public void breakConnection(@PathVariable Long id) {
        connectionsRepository.deleteById(id);
    }
}
