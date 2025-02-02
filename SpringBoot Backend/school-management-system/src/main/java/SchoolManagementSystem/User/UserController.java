package SchoolManagementSystem.User;

import java.util.List;
import java.util.Optional;

import SchoolManagementSystem.Cookie.Cookie;
import SchoolManagementSystem.Cookie.CookieController;
import SchoolManagementSystem.Cookie.CookieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
    @Autowired
    UserRepository Users;

    @Autowired
    CookieController Cookies;

    //This allows the user to add a new user
    //TODO: Handle the case the case that a user already exists
    @RequestMapping(method = RequestMethod.POST, path = "/register-user")
    String createUser(@RequestBody User u) {
        User newUser = new User(u.firstname, u.lastname, u.username, u.password, u.usertype);
        Users.save(newUser);
        Cookie generatedCookie = Cookies.createCookie(newUser.id, u.usertype);
        return generatedCookie.getValue();
    }

    //This returns a list of all the users
    @RequestMapping(method = RequestMethod.GET, path = "/users")
    List<User> getAllUsers() {
        return Users.findAll();
    }

    //This returns an individual user
    @RequestMapping(method = RequestMethod.GET, path = "/user/{id}")
    Optional<User> getUser(@PathVariable Integer id) {
        return Users.findById(id);
    }

    //This allows the user to enter a user as input and if it works then it returns the user's cookie values
    @RequestMapping(method = RequestMethod.POST, path = "/login-user")
    ResponseEntity<String> getUser(@RequestBody User u) {
        List<User> userList = Users.findAll();
        for (User user : userList) {
            if (user.getUsername().equals(u.getUsername()) && user.getPassword().equals(u.getPassword())) {
                Cookie generatedCookie = Cookies.createCookie(user.id, 1);
                return new ResponseEntity<>(generatedCookie.getValue(), HttpStatus.OK);
            } else if (user.getUsername().equals(u.getUsername())) {
                return new ResponseEntity<>("Incorrect password", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
}
