package ComicStansMain.data;

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
    private long game_id;

    @ManyToOne
    private User creator_user_id;

    @Column
    private LocalDate dateCreated;

    @OneToMany(mappedBy = "board_id")
    private Collection<Post> Posts;




}
