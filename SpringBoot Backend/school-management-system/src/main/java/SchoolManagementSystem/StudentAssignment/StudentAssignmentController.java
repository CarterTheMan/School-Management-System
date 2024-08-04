package SchoolManagementSystem.StudentAssignment;

import java.util.*;

import SchoolManagementSystem.StudentCourse.StudentCourse;
import SchoolManagementSystem.StudentCourse.StudentCourseRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class StudentAssignmentController {
    @Autowired
    StudentAssignmentRepository studentAssignments;

    @Autowired
    StudentCourseRepository studentCourse;

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

    // This returns all assignments for a student
    @RequestMapping(method = RequestMethod.GET, path = "/studentGrades/{student_id}")
    HashMap<String, Double[]> getAllGrades(@PathVariable Integer student_id) {
        // Double[] = {overall grade, graded assignment, ungraded assignments, classID}
        HashMap<String, Double[]> gradesMap = new HashMap<String, Double[]>();

        List<StudentAssignment> assignmentList = studentAssignments.findAll();
        List<StudentCourse> courseList = studentCourse.findAll();

        // Add all assignments to the list
        for (StudentAssignment sa : assignmentList) {
            // If the assignment belongs to the student
            if (sa.getStudentCourse().getStudent().getId() == student_id) {
                String classTitle = sa.getStudentCourse().getTeacherCourse().getCourse().getTitle();

                Double[] temp;
                // Check if the class already exists in the hashmap
                if (gradesMap.containsKey(classTitle)) {
                    temp = gradesMap.get(classTitle);
                    if (sa.getGrade() != null) {
                        temp[0] += sa.getGrade();
                        temp[1] += 1;
                    } else {
                        temp[2] += 1;
                    }
                } else {
                    if (sa.getGrade() != null) {
                        temp = new Double[]{sa.getGrade(), 1.00, 0.00, Double.valueOf(sa.getStudentCourse().getId())};
                    } else {
                        temp = new Double[]{0.00, 0.00, 1.00};
                    }
                }
                gradesMap.put(classTitle, temp);
            }
        }

        for (StudentCourse course : courseList) {
            // If the student is in the course
            if (course.getStudent().getId() == student_id) {
                String classTitle = course.getTeacherCourse().getCourse().getTitle();

                // If the class is already in the hashmap
                if (gradesMap.containsKey(classTitle)) {
                    Double[] temp = gradesMap.get(classTitle);
                    temp[0] = temp[0] / temp[1];
                    gradesMap.put(classTitle, temp);
                } else {
                    gradesMap.put(classTitle, new Double[]{null, null, null, Double.valueOf(course.getId())});
                }
            }
        }

        return gradesMap;
    }
}