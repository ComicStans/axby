package ComicStansMain.data;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "abyx_games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String name;
//    We'll probably need a genre table and to associate these with a many to many'
//    @Column
//    private Collection<String> themes/genres;
//    I feel like the themes part of the API is more what I envision when I think of categorizing games,
//    but we can use their games or genres or both
    @Column(nullable = false)
    private String summary;
    @Column
//    URL pointing to the image of the game's cover art. Can be obtained by adding "cover.url" as a field in the api call
    private String art;
    @Column(nullable = false)
    //    If we want to seperate games into the platforms on which they are available (SNES, sega dreamcast, etc....)
//    We'll need another many to many relationship with a table listing those platforms.
//    That or we can just make it a string that states all available platforms
    private String platforms;
//    A collection of similar games come back as part of the API call, we can use that to fill this,
//    We can look at changing this to be a key that points to another game if we decide that's what we
//    want to do, but I'm leaving it as a string for now.
    @Column
    private String similar_games;
    @Column
//    The names of the companies involved can be obtained by adding "involved_companies.company.name" to the fields,
//    Be aware that not all games seem to have an "involved_companies" property.
    private String companies;
}
