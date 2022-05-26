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

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    @JsonIgnoreProperties({"boards","posts", "guilds", "guildsCreated"})
    private User creator;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    @OneToMany(mappedBy = "boardId")
    @JsonIgnoreProperties({"boardId", "authorId"})
    private Collection<Post> posts;

//One Board can have many admin Users; each User can administer many Boards.
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = User.class
    )

    @JoinTable(
            name="axby_board_admin",
            joinColumns = {@JoinColumn(name = "board_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="admin_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("admins")
    private Collection<User> admins;
}
