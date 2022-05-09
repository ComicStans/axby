package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface UsersRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    User findByEmail(String email);
    Collection<User> findAllByUsernameLike(String namePattern);
}
