package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserGameListsRepository extends JpaRepository<UserGameList, Long> {

    List<UserGameList> findAll();
    Collection<UserGameList> findAllByUserAndStatus(User user, String status);
    Collection<UserGameList> findAllByGameAndStatus(Game game, String status);

}
