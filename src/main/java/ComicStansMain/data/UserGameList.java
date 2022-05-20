//package ComicStansMain.data;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import lombok.*;
//
//import javax.persistence.*;
//import java.time.LocalDate;
//
//@Getter
//@Setter
//@ToString
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "axby_user_game_lists")
//public class UserGameList {
//    public enum status {PLAYED, WANNAPLAY}
//    //This class will contain a collection of Games;
//    //each game will have properties of its own, including an optional user-authored rating & review.
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    @JsonIgnoreProperties("userGameLists")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "game_id", nullable = false)
//    @JsonIgnoreProperties("userGameLists")
//    private Game game;
//
//    @Column(name = "status")
//    private String status;
//
//    @Column(name = "review_text")
//    private String review;
//
//    @Column(name = "date_updated")
//    private LocalDate dateUpdated;
//
////Each PlayedList can have many games; it doesn't matter that a game appears on
////multiple users' PlayedLists.
////    @ManyToMany(
////            fetch = FetchType.LAZY,
////            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
////            targetEntity = Game.class)
////
////    @JoinTable(
////            name="axby_game_played_list",
////            joinColumns = {@JoinColumn(name = "played_list_id", nullable = false, updatable = false)},
////            inverseJoinColumns = {@JoinColumn(name="game_id", nullable = false, updatable = false)},
////            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
////            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
////    )
////
////    @OneToMany(mappedBy = "playedList", cascade = CascadeType.REMOVE, orphanRemoval = true)
////    @JsonIgnoreProperties("playedList")
////    private Collection<Game> games;
//
//}
