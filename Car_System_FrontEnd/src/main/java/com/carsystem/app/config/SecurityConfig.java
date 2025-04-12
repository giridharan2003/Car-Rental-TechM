// package com.carsystem.app.config;

// import com.carsystem.app.util.JwtFilter;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Autowired
//     private JwtFilter jwtFilter;

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable()) // Disable CSRF
//             .cors(cors -> cors.configure(http)) // Enable CORS with default configuration
//             .sessionManagement(session -> session
//                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session management
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/login","/", "/register", "/send-otp", 
//                                  "/verify-otp", "/reset-password").permitAll() // Allow AuthController endpoints
//                 .anyRequest().authenticated() // All other requests require authentication
//             )
//             .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // Add custom JWT filter

//         return http.build();
//     }
// }
