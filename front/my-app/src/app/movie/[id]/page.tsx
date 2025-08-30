import { Box, Typography, Button, Grid, Avatar, Card, CardContent, Rating, Stack } from "@mui/material";
import { getMovieCredits, getMovieDetails } from "../../../lib/movies"; 
import { StyledButton } from "@/src/components/ui/StyledButton";
import Link from "next/link";
import { getUserMovieReview } from "@/src/lib/reviews";
import { StyledRating } from "@/src/components/ui/Styledrating";
import ReviewCard from "@/src/components/ReviewCard";

type MovieDetailsProps = {
  params: { id: number };
};


export default async function MovieDetails({ params }: MovieDetailsProps) {

  const movie = await getMovieDetails(params.id);
  const credits = await getMovieCredits(params.id);
  const review = await getUserMovieReview(params.id);
  
  
  return (
    <Box sx={{ p: 4, display: "flex", gap: 4 }}>
      
      
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{ borderRadius: 2, width: 280, boxShadow: 4 }}
          />

          
          <Link href={`/movie/${params.id}/log`} style={{ textDecoration: "none", width: "100%" }}>
            {review ? (
              <StyledButton fullWidth>
                Update Review
              </StyledButton>
              ) : (
                <StyledButton fullWidth>
                  Add To Your Repo
                </StyledButton>
              )}
          </Link>
        </Box>

      
      <Box sx={{ flex: 1, color: "white" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {movie.title}
        </Typography>

        
        <Typography variant="body1" sx={{ mb: 2 }}>
          {movie.overview}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Typography><b>Rating:</b> {movie.vote_average.toFixed(1)}</Typography>
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

        {review && <ReviewCard review={review} title="Your Review" />}

        <Grid size={{ xs: 12, sm: 6}}>
            <Link href={`/movie/${params.id}/reviews`} passHref>
              <Button
                variant="outlined"         
                sx={{
                  color: '#9E88FF',
                  borderColor: '#9E88FF',
                  borderRadius: '8px',
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(158, 136, 255, 0.1)',
                    borderColor: '#9E88FF',
                  },
                }}
              >
                Show All User Reviews
              </Button>
            </Link>
          </Grid>
        </Grid>    
      </Box>
    </Box>
  );
}
