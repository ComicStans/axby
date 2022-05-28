package ComicStansMain.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

//Each Connection has two related Users: the Requester and the Recipient of the the request.
//There is a double one-to-many relationship between Users and Connections.
//If the Recipient accepts the Connection request, the date_accepted field gets a date-time stamp;
//if not, the Connection record is deleted.

public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "guilds", "boards", "posts", "boardsAdministered"})
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne
    @JoinColumn(name = "recipient_id", nullable = false)
    @JsonIgnoreProperties({"guilds", "boards", "posts", "boardsAdministered"})
    private User recipient;

    @Column(name="date_requested", nullable = false)
    private LocalDate dateRequested;

    @Column(name="date_accepted")
    private LocalDate dateAccepted;

}
