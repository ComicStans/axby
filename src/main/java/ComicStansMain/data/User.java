package ComicStansMain.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

public class User {

    //The User is the central object in this social-networking-style application.
    //The Users table is related, one-to-many, to Boards, Lists, Reports, and User_Preference.
    //It is related, many-to-many, to Games, Guilds, Sensitive_Content, and Connections

    //Instance variables:
    public enum Role {VISITOR, USER, PREMIUM, ADMIN}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 32)
    private String username;

    @Email
    @NotEmpty
    @Column(nullable = false, length = 100)
    private String email;

    @Column
    private boolean emailVerified;

    @Column(nullable = false, length = 32)
    @ToString.Exclude
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

//Each User will have one PlayedList and one WannaPlayList.
//The played list will feature reviews of the Games listed.
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "played_list_id", referencedColumnName = "id")
//    @JsonIgnoreProperties("user")
//    private PlayedList played;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "wanna_play_list_id", referencedColumnName = "id")
//    @JsonIgnoreProperties("user")
//    private WannaPlayList wannaPlay;

//Each User can belong to many Guilds, each of which can have many Users (or it wouldn't be a Guild, would it?).
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Guild.class
    )

    @JoinTable(
            name="axby_guild_user",
            joinColumns = {@JoinColumn(name = "id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="user_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("users")
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
    private Collection<GuildBoard> guildBoardsAdministered;

//User one-to-many Collections: boards, posts, reports, preferences.
//The reports table has two columns with Users as foreign keys: the user reporting
//and the user reported.
    @OneToMany(mappedBy = "userId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("userId")
    private Collection<Preference> preferences;

    @OneToMany(mappedBy = "userReporting", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("userReporting")
    private Collection<Report> reports;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("creator")
    private Collection<Board> boards;

    @OneToMany(mappedBy = "authorId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("authorId")
    private Collection<Post> posts;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private Collection<UserGameList> userGameLists;

}