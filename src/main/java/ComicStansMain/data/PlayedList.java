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
@Table(name = "axby_played_lists")
public class PlayedList {

    //This class will contain a collection of Games;
    //each game will have properties of its own, including an optional user-authored rating & review.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(mappedBy = "played")
    private User user;

    @Column(name = "date_created", nullable = false)
    private LocalDate dateCreated;

//Each PlayedList can have many games; it doesn't matter that a game appears on
//multiple users' PlayedLists.
//    @ManyToMany(
//            fetch = FetchType.LAZY,
//            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
//            targetEntity = Game.class)
//
//    @JoinTable(
//            name="axby_game_played_list",
//            joinColumns = {@JoinColumn(name = "played_list_id", nullable = false, updatable = false)},
//            inverseJoinColumns = {@JoinColumn(name="game_id", nullable = false, updatable = false)},
//            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
//            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
//    )

    @OneToMany(mappedBy = "playedList", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("playedList")
    private Collection<Game> games;

}
