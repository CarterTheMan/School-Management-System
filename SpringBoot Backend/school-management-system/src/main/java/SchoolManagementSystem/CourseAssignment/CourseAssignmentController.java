package SchoolManagementSystem.CourseAssignment;

import java.util.List;
import java.util.Optional;

import SchoolManagementSystem.StudentAssignment.StudentAssignmentRepository;
import SchoolManagementSystem.StudentCourse.StudentCourseRepository;
import SchoolManagementSystem.TeacherCourse.TeacherCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class CourseAssignmentController {
    @Autowired
    CourseAssignmentRepository courseAssignment;

    @Autowired
    TeacherCourseRepository teacherCourse;

    @Autowired
    StudentCourseRepository studentCourse;

    @Autowired
    StudentAssignmentRepository studentAssignment;

    //This allows the user to add a CourseAssignment
    @RequestMapping(method = RequestMethod.POST, path = "/add-course-assignment")
    CourseAssignment createCourseAssignment(@RequestBody CourseAssignment ca) {
        courseAssignment.save(ca);
        return ca;
    }

    //This returns a list of all the CourseAssignment
    @RequestMapping(method = RequestMethod.GET, path = "/courseAssignments")
    List<CourseAssignment> getAllCourseAssignments() {
        return courseAssignment.findAll();
    }

    //This returns an individual CourseAssignment
    @RequestMapping(method = RequestMethod.GET, path = "/courseAssignment/{id}")
    Optional<CourseAssignment> getCourseAssignment(@PathVariable Integer id) {
        return courseAssignment.findById(id);
    }
}