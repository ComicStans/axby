package ComicStansMain.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "axby_boards")
public class Board {

    //Each Board will have one Game or Game-type to which it is related.
    //Some Boards will be pre-created by the site admins, dedicated to most popular titles;
    //other Boards will be created by Users (paid/premium users?).

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    @JsonIgnoreProperties("boards")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    @JsonIgnoreProperties({"boards","posts", "played"})
    private User creator;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    @OneToMany(mappedBy = "boardId")
    @JsonIgnoreProperties("boardId")
    private Collection<Post> posts;


}
