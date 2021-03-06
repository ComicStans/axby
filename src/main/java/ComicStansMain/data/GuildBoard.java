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
@Table(name = "axby_guild_boards")
public class GuildBoard {

//Each GuildBoard will have one Guild to which it is related.
//GuildBoards should be created immediately upon the creation of the related Guilds.
//Each GuildBoard can have many GuildBoardPosts.
//Each GuildBoard can have many GuildBoardAdmins (User entities);
//each User can administer many GuildBoards.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "date_created")
    private LocalDate dateCreated;

//Each Guild will have one GuildBoard.
//The GuildBoard is created at the same time as the Guild.
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "guild_id", referencedColumnName = "id", unique = true)
    @JsonIgnoreProperties({"guildBoard","guilds"})
    private Guild guild;

//Each GuildBoard can have many Posts.
    @OneToMany(mappedBy = "guildBoardId")
    @JsonIgnoreProperties("guildBoardId")
    private Collection<GuildBoardPost> guildBoardPosts;

//Each GuildBoard can have many Users as admins; a user may be an admin on many GuildBoards.
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = User.class
    )

    @JoinTable(
            name="axby_guildboard_admin",
            joinColumns = {@JoinColumn(name = "guild_board_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="guild_admin_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("admins")
    private Collection<User> admins;



}
