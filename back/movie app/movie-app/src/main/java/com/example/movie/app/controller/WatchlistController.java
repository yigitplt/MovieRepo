package com.example.movie.app.controller;

import com.example.movie.app.entity.User;
import com.example.movie.app.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistService watchlistService;

    @PostMapping("/{movieId}")
    public ResponseEntity<Void> addToWatchlist(@AuthenticationPrincipal User user, @PathVariable Long movieId){
        watchlistService.addToWatchlist(user, movieId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> removeFromWatchlist(@AuthenticationPrincipal User user, @PathVariable Long movieId){
        watchlistService.removeFromWatchlist(user, movieId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Long>> getWatchlist(@AuthenticationPrincipal User user){
        List<Long> movieIds = watchlistService.getWatchlistMovieIds(user);
        return ResponseEntity.ok(movieIds);
    }

    @GetMapping("/{movieId}/status")
    public ResponseEntity<Map<String, Boolean>> getWatchlistStatus(@AuthenticationPrincipal User user, @PathVariable Long movieId) {
        boolean isOnWatchlist = watchlistService.isMovieOnWatchlist(user, movieId);
        return ResponseEntity.ok(Collections.singletonMap("isOnWatchlist", isOnWatchlist));
    }
}
