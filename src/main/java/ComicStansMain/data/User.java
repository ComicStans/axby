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
    private long id;

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

    @Column(nullable = false)
    private String preferredLanguage;

    @Column(nullable = false, length = 50)
    private String locationRegion;

    @Column(nullable = false, length = 50)
    private String locationCountry;

    @Column
    private String aboutUserText;

    @Column(nullable = false)
    @Enumerated
    private Role accessLevel;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Guild.class)

    @JoinTable(
            name="axby_guild_user",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="guild_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("guilds")
    private Collection<Guild> guilds;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = SensitiveContent.class)

    @JoinTable(
            name="axby_user_content_filter",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="sensitive_content_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("sensitiveContent")
    private Collection<SensitiveContent> sensitiveContent;

    //User one-to-many Collections: lists, boards, posts, reports, preferences.
    //The reports table has two columns with Users as foreign keys: the user reporting
    //and the user reported.

    @OneToMany(mappedBy = "userId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("preferences")
    private Collection<Preference> preferences;

    @OneToMany(mappedBy = "userReporting", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("reports")
    private Collection<Report> reports;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("lists")
    private Collection<List> lists;

    @OneToMany(mappedBy = "authorId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("posts")
    private Collection<Post> posts;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("boards")
    private Collection<Board> boards;
}