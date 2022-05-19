package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface GuildBoardsRepository extends JpaRepository<GuildBoard, Long> {

    GuildBoard findByName(String name);

    @Query(value = "select * from guild_boards where name like %?1%",
    nativeQuery = true)
    Collection<GuildBoard> findAllByNameLike(String namePattern);
}
