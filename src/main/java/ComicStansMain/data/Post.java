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

    //Each Post is associated with one board and one user.
    //Posts can be Original or Reply; if Reply, the Post has a post_replied_to value.
    public enum postType {ORIGINAL, REPLY}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Board boardId;

    @ManyToOne
    private User authorId;

    @Column(name = "post_type")
    @Enumerated
    private postType postType;

    @Column(name = "post_text")
    private String postText;

    @Column(nullable = false, name = "post_replied_to")
    private long postRepliedTo;

    @Column(name = "post_time")
    private LocalDate postTime;

}
