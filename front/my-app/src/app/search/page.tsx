"use client";

import { useState, useCallback } from "react";
import { TextField, Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import debounce from "lodash.debounce";
import MovieCard from "@/src/components/ui/MovieCard";



export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (value: string) => {
    if (value.length < 3) {
      setResults([]);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchMovies, 400), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        fullWidth
        label="Search Movies"
        value={query}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      {results.length > 0 ? (
        <Grid container spacing={2}>
          {results.map((movie) => (
            <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
              <MovieCard 
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average} /> 
            </Grid>
          ))}
        </Grid>
      ) : (
        query && <Typography>No results found</Typography>
      )}
    </Box>
  );
}
