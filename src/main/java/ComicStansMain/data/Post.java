package ComicStansMain.data;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "axby_posts")
public class Post {

    //Each Post is associated with one board and one user.
    //Posts can be Original or Reply; if Reply, the Post has a post_replied_to value.
    public enum postType {ORIGINAL, REPLY}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private Board boardId;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User authorId;

    @Column(name = "post_type", nullable = false)
    @Enumerated
    private postType postType;

    @Column(name = "post_text")
    private String postText;

    @Column(name = "post_replied_to")
    private long postRepliedTo;

    @Column(name = "post_time", nullable = false)
    private Date postTime;

}
