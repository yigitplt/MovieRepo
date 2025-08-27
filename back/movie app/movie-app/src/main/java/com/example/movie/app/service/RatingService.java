package com.example.movie.app.service;

import com.example.movie.app.entity.Rating;
import com.example.movie.app.entity.User;
import com.example.movie.app.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RatingService {
    private final RatingRepository ratingRepository;

    public Rating rateMovie(User user, Long movieId, Double rating){
        boolean isRated = ratingRepository.existsByMovieIdAndUser(movieId, user);

        if(isRated){
            Rating previousRating = ratingRepository.findByMovieIdAndUser(movieId, user).get();
            previousRating.setRating(rating);
            return ratingRepository.save(previousRating);
        }else{
            Rating newRating = new Rating();
            newRating.setUser(user);
            newRating.setMovieId(movieId);
            newRating.setRating(rating);
            return ratingRepository.save(newRating);
        }
    }
}
