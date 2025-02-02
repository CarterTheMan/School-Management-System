package SchoolManagementSystem.Cookie;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class CookieController {
    @Autowired
    CookieRepository cookies;

    //This allows the user to add a cookie using a request body
    @RequestMapping(method = RequestMethod.POST, path = "/add-cookie-body")
    Cookie createCookie(@RequestBody Cookie c) {
        // If the cookie already exists for that user, update valid time
        for (Cookie cookie : cookies.findAll()) {
            if (cookie.user_id.equals(c.user_id) && cookie.user_type.equals(c.user_type)) {
                return updateCookieTime(cookie.getValue());
            }
        }

        // Generate new cookie
        Cookie newCookie = new Cookie(c.user_id, c.user_type);
        cookies.save(newCookie);
        return newCookie;
    }

    //This allows the user to add a cookie using parameters
    @RequestMapping(method = RequestMethod.POST, path = "/add-cookie-param")
    public Cookie createCookie(Integer user_id, Integer user_type) {
        // If the cookie already exists for that user, update valid time
        for (Cookie cookie : cookies.findAll()) {
            if (cookie.user_id.equals(user_id) && cookie.user_type.equals(user_type)) {
                return updateCookieTime(cookie.getValue());
            }
        }

        // Generate new cookie
        Cookie newCookie = new Cookie(user_id, user_type);
        cookies.save(newCookie);
        return newCookie;
    }

    //Updates a cookies time based on the value
    @RequestMapping(method = RequestMethod.GET, path = "/update-cookie-time")
    public Cookie updateCookieTime(String value) {
        Cookie cookieToUpdate = cookies.findByValue(value);
        cookieToUpdate.setExpire(ZonedDateTime.now().plusMinutes(30L));
        cookies.save(cookieToUpdate);
        return cookieToUpdate;
    }

    //This returns a list of all the cookie
    @RequestMapping(method = RequestMethod.GET, path = "/cookie")
    List<Cookie> getAllCookies() {
        return cookies.findAll();
    }

    //This returns an individual cookie
    @RequestMapping(method = RequestMethod.GET, path = "/cookie/{id}")
    Optional<Cookie> getCookie(@PathVariable Integer id) {
        return cookies.findById(id);
    }
}