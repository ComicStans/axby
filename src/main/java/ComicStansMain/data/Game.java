package ComicStansMain.data;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

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
    private Date releaseDate;

    @Column(name = "review")
    private String review;

    @Column(name = "summary")
    private String summary;

    @Column(name = "similar_games")
    private String similarGames;

}
