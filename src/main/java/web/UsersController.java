package web;


import data.User;
import data.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "api/users", headers = "Accept=application/json")

public class UsersController {
    private final UsersRepository ur;
    private final PasswordEncoder pe;

    public UsersController(UsersRepository ur, PasswordEncoder pe) {
        this.ur = ur;
        this.pe = pe;
    }

    private List<User> getAll() {
        ArrayList<User> users = new ArrayList<>();
        return users;
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

    @PostMapping
    private void createUser(@RequestBody User newUser) {
        newUser.setAccessLevel(User.Role.USER);
        String encryptedPassword = newUser.getPassword();
        encryptedPassword = pe.encode(encryptedPassword);
        newUser.setPassword(encryptedPassword);
        ur.save(newUser);
    }

    @PutMapping("{id}")
    private void updateUser(@PathVariable long id, @RequestBody User thisUser) {
        User tempUser = new User();
        tempUser.setUsername(thisUser.getUsername());
        tempUser.setPassword(thisUser.getPassword());
        tempUser.setEmail(thisUser.getEmail());
        tempUser.setLocationRegion(thisUser.getLocationRegion());
        tempUser.setLocationCountry(thisUser.getLocationCountry());
        ur.save(id, thisUser);
    }

    @PutMapping("{id}/password")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 3) @RequestParam String newPassword) {
        User u = ur.getById(id);
        oldPassword = u.getPassword();
        if (newPassword != oldPassword || newPassword.length() > 8) {
            u.setPassword(newPassword);
            ur.save(u);
        }
//        if (newPassword == oldPassword) {
//            System.out.println("Sorry, you may not repeat your previous password");
//        } else if (newPassword.length() <= 2) {
//            System.out.println("Please make sure that your password is at least 3 characters in length.");
//        } else {
//            System.out.println("Password for user #" + id + " has been updated.");
//        }
    }

    @DeleteMapping("{id}")
    private void deleteUser(@PathVariable long id) {
        ur.deleteById(id);
    }

}
