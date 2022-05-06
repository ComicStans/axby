package ComicStansMain.data;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "axby_posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Board board_id;

    @ManyToOne
    private User author_id;

    @Column
    @Enumerated(EnumType.STRING)
    private String post_type;

    @Column
    private String post_text;

    @Column(nullable = false)
    private long post_replied_to;

    @Column
    private LocalDate post_time;

}
