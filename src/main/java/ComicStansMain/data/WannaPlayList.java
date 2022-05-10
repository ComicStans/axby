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
@Table(name = "axby_wanna_play_lists")
public class WannaPlayList {

//This class will contain a collection of Games;
//each game will have properties of its own, including an optional user-authored rating & review.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(mappedBy = "wannaPlay")
    private User user;

    @Column(name = "date_created", nullable = false)
    private LocalDate dateCreated;

//Each WannaPlayList can have many games; each game can appear on many WannaPlayLists
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Game.class)

    @JoinTable(
            name="axby_game_wannaplay_list",
            joinColumns = {@JoinColumn(name = "wannaplay_list_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="game_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    @JsonIgnoreProperties("games")
    private Collection<Game> games;

}
