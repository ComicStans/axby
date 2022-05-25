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
@Table(name = "axby_games")

public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "art")
    private String art;

    @Column(name = "companies")
    private String companies;

    @Column(name = "name")
    private String name;

    @Column(name = "platforms")
    private String platforms;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "review")
    private String review;

    @Column(name = "summary")
    private String summary;

    @Column(name = "similar_games")
    private String similarGames;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"games", "guilds", "sensitiveContent", "guildBoardsAdministered", "preferences", "reports", "boards", "posts", "guildsCreated", "boardsAdministered"})
    private User user;
}
