package com.example.movie.app.controller;

import com.example.movie.app.dto.RatingRequest;
import com.example.movie.app.dto.RatingResponse;
import com.example.movie.app.entity.Rating;
import com.example.movie.app.entity.User;
import com.example.movie.app.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;


    @PostMapping
    public ResponseEntity<RatingResponse> rateMovie(@AuthenticationPrincipal User user, @RequestBody RatingRequest ratingRequest){
        Rating rating = ratingService.rateMovie(user, ratingRequest);
        return ResponseEntity.ok(new RatingResponse(rating));
    }
}
