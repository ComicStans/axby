package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface GuildsRepository extends JpaRepository<User, Long> {

    Guild findByName(String name);
    Collection<Guild> findAllByUserId(Long userId);
    Collection<Guild> findAllByNameLike(String namePattern);

}
