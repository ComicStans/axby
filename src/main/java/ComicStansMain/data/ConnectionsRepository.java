package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ConnectionsRepository extends JpaRepository<User, Long> {

    Collection<User> findAllByRequesterId(Long requesterId);

    Collection<User> findAllByRecipientId(Long recipientId);

}
