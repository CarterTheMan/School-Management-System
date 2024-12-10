package SchoolManagementSystem.Cookie;

import SchoolManagementSystem.TeacherCourse.TeacherCourse;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.Set;
import java.util.Random;

@Entity
@Table(name = "cookie")
public class Cookie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    String value;

    @Column
    Integer user_id;

    @Column
    Integer user_type;

    @Column
    ZonedDateTime expire;

    public Cookie() {}

    public Cookie(Integer user_id, Integer user_type) {
        this.user_id = user_id;
        this.user_type = user_type;
        value = getSaltString();
        expire = ZonedDateTime.now().plusMinutes(30L);
    }

    public Integer getId() {
        return id;
    }

    public String getValue() {
        return value;
    }

    public Integer getUserId() {
        return user_id;
    }

    public Integer getUserType() {
        return user_type;
    }

    public ZonedDateTime getExpire() {
        return expire;
    }

    public void setExpire(ZonedDateTime z) {
        expire = z;
    }

    protected String getSaltString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 64) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        return salt.toString();
    }

}
