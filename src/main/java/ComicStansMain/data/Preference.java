package ComicStansMain.data;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "axby_user_preference")

//This class represents User settings. Users can select different types of content that they
//can filter out from viewing, based on age rating or content rating as enumerated in igdb.com's API.
//There is a one-to-many relationship with Users: one User, many Preferences.

public class Preference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @Column(name = "filter_age_rating")
    private int filterAgeRating;

    @Column(name = "filter_content")
    private int filterContent;


}
