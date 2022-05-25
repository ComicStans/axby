package ComicStansMain.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

public interface ReportsRepository extends JpaRepository<Report, Long> {

    Collection<Report> findAllByUserReporting(User userSource);
    Collection<Report> findAllByUserReported(User userTarget);
//    Collection<Report> findAllByUserReportedName(String userName);
    Collection<Report> findAllByDateResolved(LocalDate dateResolved);
    Collection<Report> findAllByDateResolvedAndUserReporting(LocalDate dateResolved, User userReporting);

}
