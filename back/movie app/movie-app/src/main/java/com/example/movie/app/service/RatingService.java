package com.example.movie.app.service;

import com.example.movie.app.dto.RatingRequest;
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

    public Rating rateMovie(User user, RatingRequest request) {
        boolean isRated = ratingRepository.existsByMovieIdAndUser(request.getMovieId(), user);

        if(isRated){
            Rating previousRating = ratingRepository.findByMovieIdAndUser(request.getMovieId(), user).get();
            previousRating.setRating(request.getRating());
            previousRating.setComment(request.getComment());
            previousRating.setWatchDate(request.getWatchDate());
            return ratingRepository.save(previousRating);
        }else{
            Rating newRating = new Rating();
            newRating.setUser(user);
            newRating.setMovieId(request.getMovieId());
            newRating.setRating(request.getRating());
            newRating.setWatchDate(request.getWatchDate());
            newRating.setComment(request.getComment());
            return ratingRepository.save(newRating);
        }
    }

    public Optional<Rating> getRatingOfMovie(User user, Long movieId){
        return ratingRepository.findByMovieIdAndUser(movieId, user);
    }
}
