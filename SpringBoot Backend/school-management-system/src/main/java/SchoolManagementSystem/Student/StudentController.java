package SchoolManagementSystem.Student;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class StudentController {
    @Autowired
    StudentRepository Students;

    //This allows the user to add a student
    @RequestMapping(method = RequestMethod.POST, path = "/register-student")
    Student createStudent(@RequestBody Student s) {
        Students.save(s);
        return s;
    }

    //This returns a list of all the students
    @RequestMapping(method = RequestMethod.GET, path = "/students")
    List<Student> getAllStudents() {
        return Students.findAll();
    }

    //This returns an individual student
    @RequestMapping(method = RequestMethod.GET, path = "/student/{id}")
    Optional<Student> getStudent(@PathVariable Integer id) {
        return Students.findById(id);
    }

    //This allows the user to enter a student as input and if it works then it returns the students id number
    @RequestMapping(method = RequestMethod.POST, path = "/login-student")
    ResponseEntity<String> getStudent(@RequestBody Student s) {
        List<Student> studentList = Students.findAll();
        for (Student stu : studentList) {
            if (stu.getUsername().equals(s.getUsername()) && stu.getPassword().equals(s.getPassword())) {
                return new ResponseEntity<>("Success", HttpStatus.OK);
            } else if (stu.getUsername().equals(s.getUsername())) {
                return new ResponseEntity<>("Incorrect password", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

}