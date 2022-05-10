package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

import java.util.List;

public interface GamesRepository extends JpaRepository<Game, Long> {
    Game findByName(String Name);
@Query(
        value = "SELECT * FROM axby_games u WHERE u.companies like %:companyName%",
        nativeQuery = true)
List<Game> findAllByCompanies(@Param("companyName") String companyName);
}
