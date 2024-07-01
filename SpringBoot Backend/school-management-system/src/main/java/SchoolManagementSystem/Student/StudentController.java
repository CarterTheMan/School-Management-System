package SchoolManagementSystem.Student;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class StudentController {
    @Autowired
    StudentRepository students;

    //This allows the user to add a student
    @RequestMapping(method = RequestMethod.POST, path = "/register-student")
    Student createStudent(@RequestBody Student s) {
        students.save(s);
        return s;
    }

    //This returns a list of all the students
    @RequestMapping(method = RequestMethod.GET, path = "/students")
    List<Student> getAllStudents() {
        return students.findAll();
    }

    //This returns an individual student
    @RequestMapping(method = RequestMethod.GET, path = "/student/{id}")
    Optional<Student> getStudent(@PathVariable Integer id) {
        return students.findById(id);
    }


}