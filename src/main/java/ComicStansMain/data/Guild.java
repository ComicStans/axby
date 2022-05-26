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
@Table(name = "axby_guilds")

//Many-to-many: Each Guild can have many Users as members, and each User can belong to many Guilds.
//One-to-many: There is also a relationship between Users (as Creator) and Guilds in that one User can create
//many Guilds.
//One-to-one: Each Guild has exactly one associated GuildBoard.

public class Guild {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column
    private String motto;

    @Column(name="date_created", nullable = false)
    private LocalDate dateCreated;

    @ManyToOne
    @JoinColumn(name="creator_id", nullable = false)
    @JsonIgnoreProperties({"guildsCreated","guilds","boards"})
    private User creator;

//Each Guild has one associated Board, to be created at the same time as the Guild.
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "guild_board_id", referencedColumnName = "id")
    @JsonIgnoreProperties("guild")
    private GuildBoard guildBoard;

//Each Guild can have many users as members; each user can belong to many Guilds.
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = User.class)

    @JoinTable(
            name="axby_guild_user",
            joinColumns = {@JoinColumn(name = "guild_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="user_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    @JsonIgnoreProperties("guilds")
    private Collection<User> members;
}
