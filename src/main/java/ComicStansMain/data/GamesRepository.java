package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GamesRepository extends JpaRepository<Game, Long> {
    Game findByName(String Name);
    Game findByCompaniesContains(String companies);
}
