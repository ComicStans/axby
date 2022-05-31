package ComicStansMain.data;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "axby_reports")

//A User can submit a Report advising site admins that another User has violated content restrictions
//or personal boundaries. The user_reporting and user_reported fields both represent Users.
//So there is a double one-to-many relationship between Users and Reports.
//When the issue is resolved, the admin adds resolution text & stamps the record with a date & time.

public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_reporting", nullable = false)
    private User userReporting;

    @ManyToOne
    @JoinColumn(name = "user_reported", nullable = false)
    private User userReported;

    @Column(name = "date_reported", nullable = false)
    private LocalDate dateReported;

    @Column(name = "text", nullable = false)
    private String reportText;

    @Column(name = "date_resolved")
    private LocalDate dateResolved;

    @Column(name = "resolution_text")
    private String resolutionText;

}
