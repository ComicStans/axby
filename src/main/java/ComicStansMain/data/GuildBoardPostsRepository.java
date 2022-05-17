package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface GuildBoardPostsRepository extends JpaRepository<GuildBoardPost, Long> {

    Collection<GuildBoardPost> findAllByAuthorId(User author);
    Collection<GuildBoardPost> findAllByGuildBoardId(GuildBoard board);

}
