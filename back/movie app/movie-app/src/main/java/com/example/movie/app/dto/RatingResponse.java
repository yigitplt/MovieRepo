package com.example.movie.app.dto;

import com.example.movie.app.entity.Rating;
import lombok.Data;

@Data
public class RatingResponse {
    private Long movieId;
    private Double ratingValue;
    private String username;

    public RatingResponse(Rating rating){
        this.movieId = rating.getMovieId();
        this.ratingValue = rating.getRating();
        this.username = rating.getUser().getUsername();
    }
}
