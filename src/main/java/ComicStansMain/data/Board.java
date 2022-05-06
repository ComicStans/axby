package ComicStansMain.data;

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
@Table(name = "axby_boards")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private long game_id;

    @ManyToOne
    private User creator_user_id;

    @Column(nullable = true)
    private LocalDate dateCreated;

    @OneToMany(mappedBy = "board_id")
    private Collection<post> posts;




}
