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
@Table(name = "axby_connections")
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User requester;

    @ManyToOne
    private User recipient;

    @Column(name="date_requested")
    private LocalDate dateRequested;

    @Column(name="date_rejected")
    private LocalDate dateRejected;

    @Column(name="date_accepted")
    private LocalDate dateAccepted;

}
