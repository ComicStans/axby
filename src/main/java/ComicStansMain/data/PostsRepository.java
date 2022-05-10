package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface PostsRepository extends JpaRepository<Post, Long> {

    Collection<Post> findAllByAuthorId(Long authorId);
    Collection<Post> findAllByBoardId(Long boardId);

}
