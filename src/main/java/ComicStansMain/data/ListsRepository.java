package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ListsRepository extends JpaRepository<User, Long> {

    Collection<List> findAllByUserId(Long userId);

}
