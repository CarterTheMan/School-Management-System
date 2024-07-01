package SchoolManagementSystem.Student;

import SchoolManagementSystem.StudentCourse.StudentCourse;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    String firstname;

    @Column
    String lastname;

    @Column
    String username;

    @Column
    String password;

    @OneToMany(mappedBy = "student")
    Set<StudentCourse> studentCourses;

    public Student() {}

    public Student(String firstname, String lastname, String username, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstname;
    }

    public String getLastName() {
        return lastname;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
