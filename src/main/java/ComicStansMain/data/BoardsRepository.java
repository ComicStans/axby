package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface BoardsRepository extends JpaRepository<Board, Long> {

    Board findByName(String name);
    Collection<Board> findAllByCreatorId(Long creatorId);
    Collection<Board> findAllByNameLike(String namePattern);
}
