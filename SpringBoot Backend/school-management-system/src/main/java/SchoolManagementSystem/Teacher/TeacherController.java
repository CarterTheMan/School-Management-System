package SchoolManagementSystem.Teacher;

import java.util.List;
import java.util.Optional;

import SchoolManagementSystem.Student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class TeacherController {
    @Autowired
    TeacherRepository Teacher;

    //This allows the user to add a student
    @RequestMapping(method = RequestMethod.POST, path = "/register-teacher")
    Teacher createTeacher(@RequestBody Teacher t) {
        Teacher.save(t);
        return t;
    }

    //This returns a list of all the students
    @RequestMapping(method = RequestMethod.GET, path = "/teachers")
    List<Teacher> getAllTeachers() {
        return Teacher.findAll();
    }

    //This returns an individual student
    @RequestMapping(method = RequestMethod.GET, path = "/teacher/{id}")
    Optional<Teacher> getTeacher(@PathVariable Integer id) {
        return Teacher.findById(id);
    }

    //This allows the user to enter a student as input and if it works then it returns the students id number
    @RequestMapping(method = RequestMethod.POST, path = "/login-teacher")
    ResponseEntity<String> getTeacher(@RequestBody Teacher t) {
        List<Teacher> teacherList = Teacher.findAll();
        for (Teacher tea : teacherList) {
            if (tea.getUsername().equals(t.getUsername()) && tea.getPassword().equals(t.getPassword())) {
                return new ResponseEntity<>("Success", HttpStatus.OK);
            } else if (tea.getUsername().equals(t.getUsername())) {
                return new ResponseEntity<>("Incorrect password", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

}