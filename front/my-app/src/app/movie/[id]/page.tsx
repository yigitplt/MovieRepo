// app/movie/[id]/page.tsx
import { Box, Typography, Button, Grid, Avatar, Card, CardContent } from "@mui/material";
import { getMovieCredits, getMovieDetails } from "../../../lib/movies"; // create this function

type MovieDetailsProps = {
  params: { id: number };
};

export default async function MovieDetails({ params }: MovieDetailsProps) {

  const movie = await getMovieDetails(params.id);
  const credits = await getMovieCredits(params.id);
  console.log(credits);

  return (
    <Box sx={{ p: 4, display: "flex", gap: 4 }}>
      {/* Poster */}
      <Box
        component="img"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{ borderRadius: 2, width: 280, boxShadow: 4 }}
      />

      {/* Right Side Content */}
      <Box sx={{ flex: 1, color: "white" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {movie.title}
        </Typography>

        {/* Overview */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          {movie.overview}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Typography><b>Rating:</b> {movie.vote_average}</Typography>
            <Typography><b>Release year:</b> {movie.release_date?.split("-")[0]}</Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Typography><b>Genres:</b> {movie.genres.map((g: any) => g.name).join(", ")}</Typography>
            <Typography><b>Duration:</b> {movie.runtime} mins</Typography>
          </Grid>

          {credits.cast.length > 0 && (
            <Grid container spacing={2}>
              {credits.cast.slice(0, 6).map((member: any) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
                  <Card sx={{ maxWidth: 280, bgcolor: "background.paper" }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={
                          member.profile_path
                            ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                            : "/default-avatar.png"
                        }
                        alt={member.name}
                      />
                      <Box>
                        <Typography fontWeight="bold">{member.name}</Typography>
                        <Typography variant="body2">{member.character}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
  </Grid>
)}

          


        </Grid>

        {/* Author / Crew (example: Director) */}
        
      </Box>
    </Box>
  );
}
