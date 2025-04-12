// package com.carsystem.app.util;

// import io.jsonwebtoken.Jwts;
// import org.springframework.stereotype.Component;


// @Component
// public class JwtUtil {
//     private final String SECRET_KEY = "your-very-secure-secret-key"; // Replace with env variable

//     public boolean validateToken(String token) {
//         try {
//             Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
//             return true;
//         } catch (Exception e) {
//             return false;
//         }
//     }

//     public String getEmailFromToken(String token) {
//         return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
//     }
// }