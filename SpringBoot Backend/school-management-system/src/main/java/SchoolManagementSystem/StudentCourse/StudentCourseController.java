package SchoolManagementSystem.StudentCourse;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
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

    //This returns all student courses of a student
    @RequestMapping(method = RequestMethod.GET, path = "/studentsCourses/{student_id}")
    List<StudentCourse> getStudentsCourses(@PathVariable Integer student_id) {
        List<StudentCourse> studentCourseList = studentCourses.findAll();
        List<StudentCourse> list = new java.util.ArrayList<>(Collections.emptyList());
        for (StudentCourse course : studentCourseList) {
            if (course.student.getId().equals(student_id)) {
                list.add(course);
            }
        }
        return list;
    }
}