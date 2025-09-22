import { Box, Typography, Button, Grid, Avatar, Card, CardContent, Chip, Stack, Divider } from "@mui/material";
import { getMovieCredits, getMovieDetails } from "../../../lib/movies";
import { StyledButton } from "@/src/components/ui/StyledButton";
import Link from "next/link";
import { getUserMovieReview } from "@/src/lib/reviews";
import ReviewCard from "@/src/components/ReviewCard";
import WatchlistButton from "@/src/components/WatchlistButton";
import { getWatchlistStatus } from "@/src/lib/watchlist";
import { AccessTime, CalendarMonth, Star } from "@mui/icons-material";
import theme from "@/theme";

export default async function MovieDetails({ params } : { params: { id: number }}) {

  const { id } = await params;

  const movie = await getMovieDetails(id);
  const credits = await getMovieCredits(id);
  const review = await getUserMovieReview(id);
  const watchlistStatus = await getWatchlistStatus(id);

  return (
    <Box sx={{ backgroundColor: '#14141F', color: '#FFFFFF' }}>
      <Box
        sx={{
          position: 'relative',
          height: { xs: '50vh', md: '60vh' },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          display: 'flex',
          alignItems: 'flex-end',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to top, #14141F 20%, transparent 100%)`,
          },
        }}
      >
        <Box sx={{ p: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" fontWeight="bold">
            {movie.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {movie.genres.map((g: any) => (
              <Chip key={g.id} label={g.name} variant="outlined" sx={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.5)' }} />
            ))}
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ p: { xs: 2, md: 4 } }}>
        <Grid size={{ xs: 12, md: 4}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'sticky', top: '20px' }}>
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              sx={{ borderRadius: '12px', width: '100%', maxWidth: '300px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
            />
            <Link href={`/movie/${id}/log`} style={{ textDecoration: "none", width: "100%", maxWidth: '300px' }}>
              <StyledButton fullWidth>
                {review ? "Update Your Review" : "Add to Your Repo"}
              </StyledButton>
            </Link>
            <WatchlistButton
              movieId={id}
              initialIsOnWatchlist={watchlistStatus.isOnWatchlist}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8}}>
          <Stack spacing={4}>
            <Stack direction="row" spacing={4} alignItems="center" divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.2)'}} />}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Star sx={{ color: theme.palette.secondary.main }} />
                <Typography><b>{movie.vote_average.toFixed(1)}</b> / 10</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarMonth sx={{ color: theme.palette.secondary.main }} />
                <Typography>{movie.release_date?.split("-")[0]}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTime sx={{ color: theme.palette.secondary.main }} />
                <Typography>{movie.runtime} mins</Typography>
              </Stack>
            </Stack>

            
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>Overview</Typography>
              <Typography variant="body1">{movie.overview}</Typography>
            </Box>

            
            {credits.cast.length > 0 && (
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Cast</Typography>
                <Grid container spacing={2}>
                  {credits.cast.slice(0, 6).map((member: any) => (
                    <Grid size={{ xs: 12, sm: 4}} key={member.id}>
                      <Card sx={{ bgcolor: '#1E1E2F', color: '#FFFFFF', display: 'flex', alignItems: 'center', p: 1 }}>
                        <Avatar
                          src={member.profile_path ? `https://image.tmdb.org/t/p/w185${member.profile_path}` : "/default-avatar.png"}
                          alt={member.name}
                          sx={{ width: 56, height: 56, mr: 2 }}
                        />
                        <Box>
                          <Typography fontWeight="bold">{member.name}</Typography>
                          <Typography variant="body2" sx={{color: '#8A8A9A'}}>{member.character}</Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {review && <ReviewCard review={review} title="Your Review" />}
            
            <Box>
               <Link href={`/movie/${id}/reviews`} passHref>
                <Button variant="outlined" sx={{ color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main }}>
                  Show All User Reviews
                </Button>
              </Link>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}