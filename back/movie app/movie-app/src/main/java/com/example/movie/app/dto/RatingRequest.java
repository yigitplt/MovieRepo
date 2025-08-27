package com.example.movie.app.dto;

import lombok.Data;

@Data
public class RatingRequest {
    private Long movieId;
    private Double rating;
}