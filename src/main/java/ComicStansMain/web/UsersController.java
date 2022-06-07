package ComicStansMain.web;


import ComicStansMain.data.User;
import ComicStansMain.data.UsersRepository;
//import org.springframework.ComicStansMain.security.crypto.password.PasswordEncoder;
//import org.springframework.ComicStansMain.security.oauth2.provider.OAuth2Authentication;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(value = "api/users", headers = "Accept=application/json")

public class UsersController {
    private final UsersRepository ur;
    private final PasswordEncoder pe;


    @GetMapping
    private List<User> getAll() {
        return ur.findAll();
    }

    @GetMapping("{userId}")
    private Optional<User> getByID(@PathVariable long userId) {
        return ur.findById(userId);
    }

    @GetMapping("username")
    private User getByUserName(@RequestParam String username) {
        return ur.findByUsername(username);
    }

    @GetMapping("email")
    private User getByEmail(@RequestParam String email) {
        return ur.findByEmail(email);
    }

    @GetMapping("me")
    private User getMyInfo(OAuth2Authentication auth) {
        String email = auth.getName(); // yes, the email is found under "getName()"
        return ur.findByEmail(email);
    }

    @PutMapping("aboutme")
    private void updateAboutMe(@RequestBody User user, OAuth2Authentication auth) {
        User yaboi = ur.findByEmail(auth.getName());
        yaboi.setAboutUserText(user.getAboutUserText());
        ur.save(yaboi);
    }

    @PostMapping
    private void createUser(@RequestBody User newUser) {
        newUser.setAccessLevel(User.Role.USER);
        String encryptedPassword = newUser.getPassword();
        encryptedPassword = pe.encode(encryptedPassword);
        newUser.setPassword(encryptedPassword);
        newUser.setDateJoined(LocalDate.now());
        ur.save(newUser);
    }

    @PutMapping("{id}")
    private void updateUser(@PathVariable long id, @RequestBody User thisUser) {
        User tempUser = ur.getById(id);
        tempUser.setUsername(thisUser.getUsername());
        tempUser.setPassword(thisUser.getPassword());
        tempUser.setEmail(thisUser.getEmail());
        tempUser.setLocationRegion(thisUser.getLocationRegion());
        tempUser.setLocationCountry(thisUser.getLocationCountry());
        ur.save(tempUser);
    }

    @PutMapping("password")
    public void updatePassword(@Valid @Size(min = 3) @RequestParam String newPassword, OAuth2Authentication auth) {
        System.out.println(auth);
        System.out.println(auth.getName());
        System.out.println(ur);

        User u = ur.findByEmail(auth.getName());
        System.out.println(u);
//        String oldPassword = u.getPassword();
//        if (!newPassword.equals(oldPassword) && newPassword.length() > 2) {
//            u.setPassword(pe.encode(newPassword));
//            ur.save(u);
//        }
//        if (newPassword.equals(oldPassword)) {
//            System.out.println("Sorry, you may not repeat your previous password");
//        } else if (newPassword.length() <= 2) {
//            System.out.println("Please make sure that your password is at least 3 characters in length.");
//        } else {
//            System.out.println("Password for user " + auth.getName() + " has been updated.");
//        }
        String encryptedPassword = newPassword;
        encryptedPassword = pe.encode(encryptedPassword);
        u.setPassword(encryptedPassword);
        ur.save(u);
    }

    @DeleteMapping("{id}")
    private void deleteUser(@PathVariable long id) {
        ur.deleteById(id);
    }

}
