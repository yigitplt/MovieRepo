import { getTrendingMovies } from "../lib/movies";
import { Box, Typography, Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export default async function Home() {
  const data: { results: Movie[] } = await getTrendingMovies();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Trending Movies
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
        {data.results.map((movie: Movie) => (
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
