package ComicStansMain.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "axby_users")

//The User is the central object in this social-networking-style application.
//The Users table is related, one-to-many, to Boards, Games, and User_Preference.
//It is related, many-to-many, to Guilds, Sensitive_Content, Connections, Reports,
//Board_Admins, and GuildBoard_Admins.

//(Actually, in the case of Connections and Reports, the relationship is double-one-to-many:
//both the Request and Recipient of a Connection are both User entities,
//and both the User_Reporting and User_Reported fields represent User entities.)

public class User {

    //Instance variables:
    public enum Role {VISITOR, USER, PREMIUM, ADMIN}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 32, unique = true)
    private String username;

    @Email
    @NotEmpty
    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column
    private boolean emailVerified;

    @Column(nullable = false)
    @ToString.Exclude
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(nullable = false, name = "date_joined")
    private LocalDate dateJoined;

    @Column(name = "preferred_language", length = 50)
    private String preferredLanguage;

    @Column(name = "location_region", length = 50)
    private String locationRegion;

    @Column(name = "location_country", length = 50)
    private String locationCountry;

    @Column
    private String aboutUserText;

    @Column(nullable = false)
    @Enumerated
    private Role accessLevel;

//Each User can belong to many Guilds, each of which can have many Users (or it wouldn't be a Guild, would it?).
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Guild.class
    )

    @JoinTable(
            name="axby_guild_user",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="guild_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties({"members","creator"})
    @ToString.Exclude
    private Collection<Guild> guilds;

//Each User can have many types of SensitiveContent that can be filtered out of view.
//And of course many Users may wish to filter the same types of content.
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = SensitiveContent.class
    )

    @JoinTable(
            name="axby_user_content_filter",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="sensitive_content_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("users")
    @ToString.Exclude
    private Collection<SensitiveContent> sensitiveContent;

//Each User administer many Boards, each of which can have many admin Users.
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Board.class
    )

    @JoinTable(
            name="axby_guildboard_admin",
            joinColumns = {@JoinColumn(name = "guild_admin_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="guild_board_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("guildBoardsAdministered")
    @ToString.Exclude
    private Collection<Board> BoardsAdministered;

//Each User administer many GuildBoards, each of which can have many admin Users.
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = GuildBoard.class
    )

    @JoinTable(
            name="axby_guildboard_admin",
            joinColumns = {@JoinColumn(name = "guild_admin_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="guild_board_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("guildBoardsAdministered")
    @ToString.Exclude
    private Collection<GuildBoard> guildBoardsAdministered;

//User one-to-many Collections: boards, games, posts, reports, preferences, and guildsCreated.
//The Reports table has two columns with Users as foreign keys: the user reporting
//and the user reported.
    @OneToMany(mappedBy = "userId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("userId")
    @ToString.Exclude
    private Collection<Preference> preferences;

    @OneToMany(mappedBy = "userReporting", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("userReporting")
    @ToString.Exclude
    private Collection<Report> reports;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("creator")
    @ToString.Exclude
    private Collection<Board> boards;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("author")
    @ToString.Exclude
    private Collection<Post> posts;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    @ToString.Exclude
    private Collection<Game> games;

    @OneToMany(mappedBy = "creator")
    @JsonIgnoreProperties("creator")
    @ToString.Exclude
    private Collection<Guild> guildsCreated;
}