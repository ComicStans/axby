package ComicStansMain.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

//Each Post is associated with one Board and one User.
//(This feature is temporarily disabled): Posts can be Original or Reply;
//if Reply, the Post has a post_replied_to value.

public class Post {

    public enum postType {ORIGINAL, REPLY}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "post_type", nullable = false)
    @Enumerated
    private postType postType;

    @Column(name = "post_text")
    private String postText;

//    @Column(name = "post_replied_to")
//    private long postRepliedTo;

    @Column(name = "post_time", nullable = false)
    private LocalDate postTime;

//One Board can have many Posts.
    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    @JsonIgnoreProperties({"posts", "boardID", "Author"})
    private Board boardId;

//One User can be the author of many Posts.
    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIgnoreProperties({"posts","boards", "guilds"})
    private User author;


}
