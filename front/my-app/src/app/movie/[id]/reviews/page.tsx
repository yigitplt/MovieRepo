import { Box, Typography, Stack } from "@mui/material";
import { getMovieDetails } from "@/src/lib/movies";
import { getAllUserMovieReviews } from "@/src/lib/reviews";
import ReviewCard from "@/src/components/ReviewCard";

type ReviewsPageProps = {
  params: { id: number };
};

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const movie = await getMovieDetails(params.id);
  const reviews = await getAllUserMovieReviews(params.id);

  return (
    <Box sx={{ p: 4, display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
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

          {reviews && reviews.length > 0 ? (
            reviews.map((review: any, index: number) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <Typography sx={{ color: '#8A8A9A', mt: 2 }}>
              No reviews have been written for this movie yet.
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}