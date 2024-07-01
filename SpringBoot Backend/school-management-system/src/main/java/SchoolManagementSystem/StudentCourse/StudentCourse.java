package SchoolManagementSystem.StudentCourse;

import SchoolManagementSystem.Student.Student;
import SchoolManagementSystem.StudentAssignment.StudentAssignment;
import SchoolManagementSystem.TeacherCourse.TeacherCourse;
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
    Student student;

    @ManyToOne
    @JoinColumn(name = "teacher_course_id", nullable = false)
    TeacherCourse teacherCourse;

    @OneToMany(mappedBy = "studentCourse")
    Set<StudentAssignment> StudentAssignments;

    public StudentCourse() {}

    public StudentCourse(Student s, TeacherCourse tc) {
        this.student = s;
        this.teacherCourse = tc;
    }

    public Integer getId() {
        return id;
    }

    public Student getStudent() {
        return student;
    }

    public TeacherCourse getTeacherCourse() {
        return teacherCourse;
    }

    public void setStudent(Student s) {
        student = s;
    }

    public void setTeacherCourse(TeacherCourse tc) {
        teacherCourse = tc;
    }

}