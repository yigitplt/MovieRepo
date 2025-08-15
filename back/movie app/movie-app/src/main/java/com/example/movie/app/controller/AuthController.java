package com.example.movie.app.controller;

import com.example.movie.app.dto.SignUpDto;
import com.example.movie.app.entity.User;
import com.example.movie.app.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@Valid @RequestBody SignUpDto dto){
        User user = authService.signup(dto);
        return ResponseEntity.ok(user);
    }
}
