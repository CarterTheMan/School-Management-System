package SchoolManagementSystem.StudentAssignment;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class StudentAssignmentController {
    @Autowired
    StudentAssignmentRepository studentAssignments;

    //This allows the user to link a student to a CourseAssingment and create a StudentAssignment
    @RequestMapping(method = RequestMethod.POST, path = "/link-student-courseAssignment")
    StudentAssignment createStudentAssignment(@RequestBody StudentAssignment sa) {
        studentAssignments.save(sa);
        return sa;
    }

    //This returns a list of all the StudentAssignments
    @RequestMapping(method = RequestMethod.GET, path = "/studentAssignments")
    List<StudentAssignment> getAllStudentAssignments() {
        return studentAssignments.findAll();
    }

    //This returns an individual StudentAssignments
    @RequestMapping(method = RequestMethod.GET, path = "/studentAssignment/{id}")
    Optional<StudentAssignment> getStudentAssignment(@PathVariable Integer id) {
        return studentAssignments.findById(id);
    }
}