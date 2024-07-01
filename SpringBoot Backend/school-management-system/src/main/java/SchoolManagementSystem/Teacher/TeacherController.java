package SchoolManagementSystem.Teacher;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class TeacherController {
    @Autowired
    TeacherRepository teachers;

    //This allows the user to add a student
    @RequestMapping(method = RequestMethod.POST, path = "/register-teacher")
    Teacher createTeacher(@RequestBody Teacher t) {
        teachers.save(t);
        return t;
    }

    //This returns a list of all the students
    @RequestMapping(method = RequestMethod.GET, path = "/teachers")
    List<Teacher> getAllTeachers() {
        return teachers.findAll();
    }

    //This returns an individual student
    @RequestMapping(method = RequestMethod.GET, path = "/teacher/{id}")
    Optional<Teacher> getTeacher(@PathVariable Integer id) {
        return teachers.findById(id);
    }
}