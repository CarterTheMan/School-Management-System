package SchoolManagementSystem.StudentCourse;

import SchoolManagementSystem.StudentAssignment.StudentAssignment;
import SchoolManagementSystem.TeacherCourse.TeacherCourse;
import SchoolManagementSystem.User.User;
import jakarta.persistence.*;

import java.util.Set;


@Entity
@Table(name = "student_course")
public class StudentCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    User student;

    @ManyToOne
    @JoinColumn(name = "teacher_course_id", nullable = false)
    TeacherCourse teacherCourse;

    @OneToMany(mappedBy = "studentCourse")
    Set<StudentAssignment> StudentAssignments;

    public StudentCourse() {}

    public StudentCourse(User s, TeacherCourse tc) {
        this.student = s;
        this.teacherCourse = tc;
    }

    public Integer getId() {
        return id;
    }

    public User getStudent() {
        return student;
    }

    public TeacherCourse getTeacherCourse() {
        return teacherCourse;
    }

    public void setStudent(User s) {
        student = s;
    }

    public void setTeacherCourse(TeacherCourse tc) {
        teacherCourse = tc;
    }

}