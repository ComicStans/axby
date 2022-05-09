package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ReportsRepository extends JpaRepository<User, Long> {

    Collection<Report> findAllByUserReportingId(Long userId);
    Collection<Report> findAllByUserReportedId(Long userId);
    Collection<Report> findAllByUserReportedName(String userName);
    Collection<Report> findAllUnresolved();
    Collection<Report> findAllUnresolvedByUserReportingId(Long userId);

}
