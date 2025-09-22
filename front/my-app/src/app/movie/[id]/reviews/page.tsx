import { Box, Typography, Stack } from "@mui/material";
import { getMovieDetails } from "@/src/lib/movies";
import { getAllUserMovieReviews } from "@/src/lib/reviews";
import ReviewsList from "@/src/components/ReviewsList"; 


export default async function ReviewsPage({ params } : {params: Promise<{ id: string }>}) {

  const { id } = await params;
  const movie = await getMovieDetails(parseInt(id));
  const reviews = await getAllUserMovieReviews(parseInt(id));

  return (
    <Box sx={{ p: 4, display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0, position: 'sticky', top: '20px' }}>
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{ borderRadius: 2, width: 280, boxShadow: 4 }}
        />
      </Box>

      
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Reviews for {movie.title}
          </Typography>
          
          <ReviewsList reviews={reviews} />
        </Stack>
      </Box>
    </Box>
  );
}