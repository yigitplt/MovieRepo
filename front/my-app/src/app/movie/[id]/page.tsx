import { Box, Typography, Button, Grid, Avatar, Card, CardContent, Rating, Stack } from "@mui/material";
import { getMovieCredits, getMovieDetails } from "../../../lib/movies"; 
import { StyledButton } from "@/src/components/ui/StyledButton";
import Link from "next/link";
import { getUserMovieLog } from "@/src/lib/logs";
import { StyledRating } from "@/src/components/ui/Styledrating";

type MovieDetailsProps = {
  params: { id: number };
};

function UserReviewCard({ log }: { log: any }) {
  if (!log) return null;

  return (
    <Box
      sx={{
        bgcolor: '#1E1E2F', 
        color: '#FFFFFF',
        p: { xs: 2, md: 3 }, 
        borderRadius: '16px', 
        mt: 4,
        border: '1px solid #4D4D6B' 
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          Your Review
        </Typography>

        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <StyledRating
            name="read-only-rating"
            value={log.ratingValue} 
            max={10}
            readOnly
            precision={0.5}
            size="small"
          />
          <Typography variant="body2" sx={{ color: '#8A8A9A' }}>
            | Watched on: {new Date(log.watchDate).toLocaleDateString()}
          </Typography>
        </Box>

        
        {log.comment && (
          <Typography
            variant="body1"
            sx={{
              bgcolor: '#14141F', 
              p: 2,
              borderRadius: '8px',
              border: '1px solid #2A2A3E',
              lineHeight: 1.7,
              fontStyle: 'italic',
              color: '#ededed' 
            }}
          >
            "{log.comment}"
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default async function MovieDetails({ params }: MovieDetailsProps) {

  const movie = await getMovieDetails(params.id);
  const credits = await getMovieCredits(params.id);
  const review = await getUserMovieLog(params.id);
  
  
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

        {review && <UserReviewCard log={review} />}
        </Grid>    
      </Box>
    </Box>
  );
}
