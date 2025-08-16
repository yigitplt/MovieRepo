package com.example.movie.app.service;

import com.example.movie.app.dto.LoginRequest;
import com.example.movie.app.dto.LoginResponse;
import com.example.movie.app.dto.SignUpRequest;
import com.example.movie.app.entity.User;
import com.example.movie.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;

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
        return LoginResponse.builder().token(jwt).build();
    }
}
