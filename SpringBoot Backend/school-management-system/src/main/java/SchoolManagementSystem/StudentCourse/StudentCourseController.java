package SchoolManagementSystem.StudentCourse;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import SchoolManagementSystem.Cookie.Cookie;
import SchoolManagementSystem.Cookie.CookieController;
import SchoolManagementSystem.Cookie.CookieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class StudentCourseController {
    @Autowired
    StudentCourseRepository studentCourses;

    @Autowired
    CookieController Cookies;

    @Autowired
    CookieRepository CookiesRepo;

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

    //This returns all student courses of a student based on their ID
    @RequestMapping(method = RequestMethod.GET, path = "/studentsIDCourses/{student_id}")
    List<StudentCourse> getStudentsIDCourses(@PathVariable Integer student_id) {
        List<StudentCourse> studentCourseList = studentCourses.findAll();
        List<StudentCourse> list = new java.util.ArrayList<>(Collections.emptyList());
        for (StudentCourse course : studentCourseList) {
            if (course.student.getId().equals(student_id)) {
                list.add(course);
            }
        }
        return list;
    }

    //This returns all student courses of a student based on their cookie
    @RequestMapping(method = RequestMethod.GET, path = "/studentsCourses/{cookieValue}")
    List<StudentCourse> getStudentsCourses(@PathVariable String cookieValue) {
        Cookie cookie = CookiesRepo.findByValue(cookieValue);
        List<StudentCourse> studentCourseList = studentCourses.findAll();
        List<StudentCourse> list = new java.util.ArrayList<>(Collections.emptyList());

        for (StudentCourse course : studentCourseList) {
            if (course.student.getId().equals(cookie.getUserId())) {
                list.add(course);
            }
        }
        return list;
    }
}