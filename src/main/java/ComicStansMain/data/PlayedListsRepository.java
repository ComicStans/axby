package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface PlayedListsRepository extends JpaRepository<PlayedList, Long> {

//    Collection<Game> findAllByPlayedListId(Long plId);
    PlayedList findByUser(User user);

}
