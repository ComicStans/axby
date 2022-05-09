package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConnectionsRepository extends JpaRepository<User, Long> {

    User findAllByRequesterId(Long requesterId);

    User findAllByRecipientId(Long recipientId);

}
