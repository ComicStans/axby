package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface GuildsRepository extends JpaRepository<Guild, Long> {

    Guild findByName(String name);
    Collection<Guild> findAllByNameLike(String namePattern);

    Collection<Guild> findAllByCreator(User user);
//    Collection<Guild> findAllByUsers (User user);



}
