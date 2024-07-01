package SchoolManagementSystem.CourseAssignment;

import SchoolManagementSystem.StudentAssignment.StudentAssignment;
import SchoolManagementSystem.TeacherCourse.TeacherCourse;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "course_assignment")
public class CourseAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    String title;

    @Column
    String description;

    @ManyToOne
    @JoinColumn(name = "teacher_course_id", nullable = false)
    TeacherCourse teacherCourse;

    @OneToMany(mappedBy = "courseAssignment")
    Set<StudentAssignment> studentAssignments;

    public CourseAssignment() {}

    public CourseAssignment(TeacherCourse tc, String title, String description) {
        this.teacherCourse = tc;
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

    public TeacherCourse getTeacherCourse() {
        return teacherCourse;
    }

}