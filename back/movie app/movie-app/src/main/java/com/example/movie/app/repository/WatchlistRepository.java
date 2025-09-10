package com.example.movie.app.repository;

import com.example.movie.app.entity.User;
import com.example.movie.app.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    List<Watchlist> findByUser(User user);
    boolean existsByUserAndMovieId(User user, Long movieId);
    void deleteByUserAndMovieId(User user, Long movieId);
}
