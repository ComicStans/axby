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
@Table(name = "axby_lists")
public class List {

    //This class will contain a collection of Games;
    //each game will have properties of its own, including an optional user-authored rating & review.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User user_id;

    @Column(nullable = false,name = "list_type")
    @Enumerated(EnumType.STRING)
    private String listType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_created")
    private LocalDate dateCreated;

}
