package SchoolManagementSystem.StudentCourse;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class StudentCourseController {
    @Autowired
    StudentCourseRepository studentCourses;

    //This allows the user to link a student to a TeacherCourse and create a StudentCourse
    @RequestMapping(method = RequestMethod.POST, path = "/link-student-teacherCourse")
    StudentCourse createStudentCourse(@RequestBody StudentCourse sc) {
        studentCourses.save(sc);
        return sc;
    }

    //This returns a list of all the StudentCourses
    @RequestMapping(method = RequestMethod.GET, path = "/studentCourses")
    List<StudentCourse> getAllStudentCourses() {
        return studentCourses.findAll();
    }

    //This returns an individual StudentCourse
    @RequestMapping(method = RequestMethod.GET, path = "/studentCourse/{id}")
    Optional<StudentCourse> getStudentCourse(@PathVariable Integer id) {
        return studentCourses.findById(id);
    }
}