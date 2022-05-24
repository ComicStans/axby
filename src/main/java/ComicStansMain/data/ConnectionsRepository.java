package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface ConnectionsRepository extends JpaRepository<Connection, Long> {

    @Query(value = "select ac.*, us.username, us2.username\n" +
            "            from axby_connections ac join axby_users us on\n" +
            "            us.id = ac.requester_id join axby_users us2 on us2.id = ac.recipient_id\n" +
            "            where ac.date_accepted is not null and (ac.requester_id = ?1 or ac.recipient_id = ?1)",
        nativeQuery = true)
    Collection<Connection> findAllByActiveRequesterOrRecipient(User user);



//    @Query(value = "select ac.*, us.username, us2.username\n" +
//            "            from axby_connections ac join axby_users us on\n" +
//            "            us.id = ac.requester_id join axby_users us2 on us2.id = ac.recipient_id\n" +
//            "            where ac.date_accepted is null and ac.date_rejected is null and ac.recipient_id = ?1",
//            nativeQuery = true)
//    Collection<Connection> findAllByRecipient(Long id);

    Collection<Connection> findAllByRecipient(User user);

    Collection<Connection> findAllByRequester(User user);

}
