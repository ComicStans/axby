package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ReviewsRepository extends JpaRepository<Review, Long> {

    Collection<Review> findAllByUserAndStatus(User user, String status);
    Collection<Review> findAllByGames(Game game);

}
