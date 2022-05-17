package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface GuildBoardsRepository extends JpaRepository<GuildBoard, Long> {

    GuildBoard findByName(String name);
    Collection<GuildBoard> findAllByCreator(User creator);
    Collection<GuildBoard> findAllByNameLike(String namePattern);
}
