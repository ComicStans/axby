package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface BoardsRepository extends JpaRepository<User, Long> {

    Collection<Board> findAllByCreatorId(Long creatorId);

    Board findByName(String name);
}
