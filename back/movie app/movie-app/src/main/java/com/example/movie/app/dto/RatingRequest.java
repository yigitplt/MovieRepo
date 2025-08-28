package com.example.movie.app.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RatingRequest {
    private Long movieId;
    private Double rating;
    private LocalDate watchDate;
    private String comment;
}