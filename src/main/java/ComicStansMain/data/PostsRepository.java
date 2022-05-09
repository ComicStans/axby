package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface PostsRepository extends JpaRepository<User, Long> {

    Collection<Post> findAllByUsername(Long authorId);
    Collection<Post> findAllByBoards(Long boardId);

}
