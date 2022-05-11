package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface BoardsRepository extends JpaRepository<Board, Long> {

    Board findByName(String name);
    Collection<Board> findAllByCreator(User creator);
    Collection<Board> findAllByNameLike(String namePattern);
}
