package com.example.movie.app.dto;

import com.example.movie.app.entity.Rating;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RatingResponse {
    private Long movieId;
    private Double ratingValue;
    private LocalDate watchDate;
    private String comment;
    private String username;

    public RatingResponse(Rating rating){
        this.movieId = rating.getMovieId();
        this.ratingValue = rating.getRating();
        this.watchDate = rating.getWatchDate();
        this.comment = rating.getComment();
        this.username = rating.getUser().getUsername();
    }
}
