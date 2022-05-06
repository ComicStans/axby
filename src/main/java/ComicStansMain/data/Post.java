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
    @Column(name = "board_id")
    private Board boardId;

    @ManyToOne
    @Column(name = "author_id")
    private User authorId;

    @Column(name = "post_type")
    @Enumerated(EnumType.STRING)
    private String postType;

    @Column(name = "post_text")
    private String postText;

    @Column(nullable = false, name = "post_replied_to")
    private long postRepliedTo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "post_time")
    private LocalDate postTime;

}
