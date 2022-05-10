package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface GamesRepository extends JpaRepository<Game, Long> {
    Game findByName(String Name);
    Collection<Game> findAllByCompaniesContains(String companies);
}
