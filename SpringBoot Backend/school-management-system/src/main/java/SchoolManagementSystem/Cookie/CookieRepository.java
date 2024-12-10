package SchoolManagementSystem.Cookie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CookieRepository extends JpaRepository<Cookie, Integer> {
    List<Cookie> findAllByValue(String value);
    Cookie findByValue(String value);
}