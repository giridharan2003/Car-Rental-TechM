package com.carsystem.app.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import com.carsystem.app.model.enums.Roles;

import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "thisisaverylongsecretkeyforsecurityjwtqwertyuioasdfghjklzxcvbnm";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 5; // 5 hours

    public String generateToken(Long userId, Roles role) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("role", role.name()) // Updated to store role as String
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            System.out.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }

    public Long getUserIdFromToken(String token) {
        return Long.parseLong(getClaims(token).getSubject());
    }

    public String getRoleFromToken(String token) {
        return getClaims(token).get("role", String.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
