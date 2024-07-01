package SchoolManagementSystem.TeacherCourse;

import SchoolManagementSystem.Course.Course;
import SchoolManagementSystem.CourseAssignment.CourseAssignment;
import SchoolManagementSystem.StudentCourse.StudentCourse;
import SchoolManagementSystem.Teacher.Teacher;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "teacher_course")
public class TeacherCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    Course course;

    @OneToMany(mappedBy = "teacherCourse")
    Set<StudentCourse> studentCourses;

    @OneToMany(mappedBy = "teacherCourse")
    Set<CourseAssignment> courseAssignments;

    public TeacherCourse() {}

    public TeacherCourse(Teacher t, Course c) {
        this.teacher = t;
        this.course = c;
    }

    public Integer getId() {
        return id;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Course getCourse() {
        return course;
    }

    public void setTeacher(Teacher t) {
        teacher = t;
    }

    public void setCourse(Course c) {
        course = c;
    }

}