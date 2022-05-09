package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardsRepository extends JpaRepository<User, Long> {

    User findAllByCreatorId(Long creatorId);
    Board findByName(String name);
}
