package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface WannaPlayListsRepository extends JpaRepository<PlayedList, Long> {

//    Collection<Game> findAllByWannaPlayListId(Long wpId);

}
