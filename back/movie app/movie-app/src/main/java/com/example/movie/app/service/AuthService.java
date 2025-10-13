package com.example.movie.app.service;

import com.example.movie.app.dto.LoginRequest;
import com.example.movie.app.dto.LoginResponse;
import com.example.movie.app.dto.SignUpRequest;
import com.example.movie.app.entity.User;
import com.example.movie.app.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public User signup(SignUpRequest dto){

        if(userRepository.existsByUsername(dto.getUsername())){
            throw new RuntimeException("Username already taken");
        }

        if(userRepository.existsByEmail(dto.getEmail())){
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));
        String jwt = jwtService.generateToken(user);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwt)
                .httpOnly(true)
                .secure(true) // Should always be true in production
                .path("/")
                .maxAge(24 * 60 * 60) // 1 day
                .sameSite("None")
                .domain("movierepo.com")
                .build();

        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
        response.addHeader("Set-Cookie", jwtCookie.toString());

        return LoginResponse.builder().token("Success").build();
    }

    public void logout(HttpServletResponse response) {
        SecurityContextHolder.clearContext();

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0) // Expire immediately
                .sameSite("None")
                .domain("movierepo.com")
                .build();

        response.addHeader("Set-Cookie", jwtCookie.toString());
    }
}
