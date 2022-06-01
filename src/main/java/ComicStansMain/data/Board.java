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

//One Board can have many Posts.
//Some Boards will be pre-created by the site admins, dedicated to most popular titles;
//other Boards will be created by Users (paid/premium users?).
//Each Board has a single user, the creator, plus potentially multiple admin users.
//Each User can create or administer many Boards.
//So: Users to Boards = one-to-many and many-to-many (via the Board_Admins table)

public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(name = "date_created")
    private LocalDate dateCreated;

//Each Board has a single user that creates it, represented in the database as Creator.
    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    @JsonIgnoreProperties({"boards","posts", "guilds", "guildsCreated"})
    private User creator;

//Each Board can contain many Posts.
    @OneToMany(mappedBy = "boardId")
    @JsonIgnoreProperties({"boardId"})
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
