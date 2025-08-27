package com.example.movie.app.repository;

import com.example.movie.app.entity.Rating;
import com.example.movie.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByMovieIdAndUser(Long movieId, User user);
    List<Rating> findByUser(User user);
    boolean existsByMovieIdAndUser(Long movieId, User user);

}
