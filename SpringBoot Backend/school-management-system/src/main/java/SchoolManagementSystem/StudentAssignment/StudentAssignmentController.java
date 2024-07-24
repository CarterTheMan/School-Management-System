package SchoolManagementSystem.StudentAssignment;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import SchoolManagementSystem.StudentCourse.StudentCourse;
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

    //This returns all assignments for a course
    @RequestMapping(method = RequestMethod.GET, path = "/studentAssignments/{student_course_id}/{student_id}")
    List<StudentAssignment> getCourseAssignments(@PathVariable Integer student_course_id, @PathVariable Integer student_id) {
        List<StudentAssignment> assignmentList = studentAssignments.findAll();
        List<StudentAssignment> list = new java.util.ArrayList<>(Collections.emptyList());
        for (StudentAssignment sa : assignmentList) {
            if (sa.getStudentCourse().getId().equals(student_course_id) && sa.getStudentCourse().getStudent().getId() == student_id) {
                list.add(sa);
            }
        }
        return list;
    }
}