package SchoolManagementSystem.Course;

import SchoolManagementSystem.TeacherCourse.TeacherCourse;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    String title;

    @Column
    String description;

    @OneToMany(mappedBy = "course")
    Set<TeacherCourse> teacherCourses;

    public Course() {}

    public Course(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

}
