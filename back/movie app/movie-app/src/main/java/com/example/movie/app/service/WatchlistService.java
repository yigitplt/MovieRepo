package com.example.movie.app.service;

import com.example.movie.app.entity.User;
import com.example.movie.app.entity.Watchlist;
import com.example.movie.app.repository.WatchlistRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WatchlistService {
    private final WatchlistRepository watchlistRepository;

    public void addToWatchlist(User user, Long movieId){
        if(!watchlistRepository.existsByUserAndMovieId(user, movieId)){
            Watchlist item = new Watchlist(null, user, movieId);
            watchlistRepository.save(item);
        }
    }

    @Transactional
    public void removeFromWatchlist(User user, Long movieId) {
        watchlistRepository.deleteByUserAndMovieId(user, movieId);
    }

    public boolean isMovieOnWatchlist(User user, Long movieId) {
        return watchlistRepository.existsByUserAndMovieId(user, movieId);
    }

    public List<Long> getWatchlistMovieIds(User user) {
        return watchlistRepository.findByUser(user).stream()
                .map(Watchlist::getMovieId)
                .toList();
    }
}
