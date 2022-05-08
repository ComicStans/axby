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
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User userReporting;

    @ManyToOne
    private User userReported;

    @Column(name = "date_reported")
    private LocalDate dateReported;

    @Column(name = "text")
    private String reportText;

    @Column(name = "date_resolved")
    private LocalDate dateResolved;

    @Column(name = "resolution_text")
    private String resolutionText;

}
