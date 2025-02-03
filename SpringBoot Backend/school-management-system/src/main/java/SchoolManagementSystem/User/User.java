package SchoolManagementSystem.User;

import SchoolManagementSystem.StudentCourse.StudentCourse;
import SchoolManagementSystem.TeacherCourse.TeacherCourse;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "firstname")
    String firstname;

    @Column(name = "lastname")
    String lastname;

    @Column(name = "username")
    String username;

    @Column(name = "password")
    String password;

    @Column(name = "usertype")
    Integer usertype;

    @OneToMany(mappedBy = "student")
    Set<StudentCourse> studentCourses;

    @OneToMany(mappedBy = "teacher")
    Set<TeacherCourse> teacherCourses;

    public User() {}

    public User(String firstname, String lastname, String username, String password, Integer usertype) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.usertype = usertype;
    }

    public Integer getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Integer getUsertype() {
        return usertype;
    }
}
