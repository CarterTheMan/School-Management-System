package SchoolManagementSystem.StudentAssignment;

import SchoolManagementSystem.CourseAssignment.CourseAssignment;
import SchoolManagementSystem.StudentCourse.StudentCourse;
import jakarta.persistence.*;

@Entity
@Table(name = "student_assignment")
public class StudentAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "student_course_id", nullable = false)
    StudentCourse studentCourse;

    @ManyToOne
    @JoinColumn(name = "course_assignment_id", nullable = false)
    CourseAssignment courseAssignment;

    @Column
    Double grade;

    @Column
    String feedback;

    public StudentAssignment() {}

    public StudentAssignment(StudentCourse s, CourseAssignment ca, Double grade, String feedback) {
        this.studentCourse = s;
        this.courseAssignment = ca;
        this.grade = grade;
        this.feedback = feedback;
    }

    public Integer getId() {
        return id;
    }

    public StudentCourse getStudentCourse() {
        return studentCourse;
    }

    public CourseAssignment getCourseAssignment() {
        return courseAssignment;
    }

    public Double getGrade() {
        return grade;
    }

    public String getFeedback() {
        return feedback;
    }

}