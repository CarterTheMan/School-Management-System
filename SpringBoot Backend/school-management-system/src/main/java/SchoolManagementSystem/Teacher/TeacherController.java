package SchoolManagementSystem.Teacher;

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
public class TeacherController {
    @Autowired
    TeacherRepository Teachers;

    @Autowired
    CookieController cookieMaker;

    @Autowired
    CookieRepository cookies;

    //This allows the user to add a student
    @RequestMapping(method = RequestMethod.POST, path = "/register-teacher")
    Teacher createTeacher(@RequestBody Teacher t) {
        Teacher newTeacher = new Teacher(t.firstname, t.lastname, t.username, t.password);
        Teachers.save(t);
        Cookie generatedCookie = cookieMaker.createCookie(newTeacher.id, 2);
        return t;
    }

    //This returns a list of all the students
    @RequestMapping(method = RequestMethod.GET, path = "/teachers")
    List<Teacher> getAllTeachers() {
        return Teachers.findAll();
    }

    //This returns an individual student
    @RequestMapping(method = RequestMethod.GET, path = "/teacher/{id}")
    Optional<Teacher> getTeacher(@PathVariable Integer id) {
        return Teachers.findById(id);
    }

    //This allows the user to enter a student as input and if it works then it returns the students id number
    @RequestMapping(method = RequestMethod.POST, path = "/login-teacher")
    ResponseEntity<String> getTeacher(@RequestBody Teacher t) {
        List<Teacher> teacherList = Teachers.findAll();
        for (Teacher tea : teacherList) {
            if (tea.getUsername().equals(t.getUsername()) && tea.getPassword().equals(t.getPassword())) {
                Cookie generatedCookie = cookieMaker.createCookie(tea.id, 2);
                return new ResponseEntity<>(tea.id.toString(), HttpStatus.OK);
            } else if (tea.getUsername().equals(t.getUsername())) {
                return new ResponseEntity<>("Incorrect password", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

}