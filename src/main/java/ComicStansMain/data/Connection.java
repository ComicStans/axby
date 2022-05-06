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

    @Column(nullable = false)
    private LocalDate date_requested;

    @Column
    private LocalDate date_rejected;

    @Column
    private LocalDate date_accepted;

}
