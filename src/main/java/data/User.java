package data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "abyx_users")

public class User {
//Instance variables:
    public enum Role {USER, ADMIN}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 32)
    private String username;

    @Email
    @NotEmpty
    @Column(nullable = false, length = 100)
    private String email;

    @Column
    private boolean emailVerified;

    @Column(nullable = false, length = 255)
    @ToString.Exclude
    private String password;

    @Column(nullable = true)
    private Date dateJoined;

    @Column(nullable = true)
    private String preferredLanguage;

    @Column(nullable = false)
    @Enumerated
    private Role role;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("author")
    @ToString.Exclude
    private Collection<Post> posts;
}