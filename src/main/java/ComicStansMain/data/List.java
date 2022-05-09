package ComicStansMain.data;

import lombok.*;
import org.hibernate.type.ListType;

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
    public enum listType {PLAYED, WANNAPLAY}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @Column(name = "list_type", nullable = false)
    @Enumerated
    private listType listType;

    @Column(name = "date_created", nullable = false)
    private LocalDate dateCreated;

}
