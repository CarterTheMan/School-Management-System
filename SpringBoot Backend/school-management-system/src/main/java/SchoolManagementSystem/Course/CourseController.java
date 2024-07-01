package SchoolManagementSystem.Course;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CourseController {
    @Autowired
    CourseRepository courses;

    //This allows the user to add a course
    @RequestMapping(method = RequestMethod.POST, path = "/add-course")
    Course createCourse(@RequestBody Course c) {
        courses.save(c);
        return c;
    }

    //This returns a list of all the courses
    @RequestMapping(method = RequestMethod.GET, path = "/courses")
    List<Course> getAllCourses() {
        return courses.findAll();
    }

    //This returns an individual course
    @RequestMapping(method = RequestMethod.GET, path = "/course/{id}")
    Optional<Course> getCourse(@PathVariable Integer id) {
        return courses.findById(id);
    }
}