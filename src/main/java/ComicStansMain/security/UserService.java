package ComicStansMain.security;

import ComicStansMain.data.User;
import ComicStansMain.data.UsersRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UserService implements UserDetailsService { //why is this not working with ServerSecurityConfig?

    private final UsersRepository repository;

    public UserService(UsersRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repository.findByEmail(email);
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getAccessLevel().name());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), Arrays.asList(authority));
    }
}