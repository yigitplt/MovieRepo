"use client";

import { useState } from 'react';
import { Box, Stack, Pagination, Typography } from '@mui/material';
import ReviewCard from "./ReviewCard";

type Review = {
  username: string;
  ratingValue: number;
  watchDate: string;
  comment: string;
};

const REVIEWS_PER_PAGE = 5;

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [page, setPage] = useState(1);

  const reviewsToShow = reviews.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);
  const pageCount = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  return (
    <Stack spacing={3}>
      {reviews && reviews.length > 0 ? (
        <>
          {reviewsToShow.map((review: any, index: number) => (
            <ReviewCard key={index} review={review} />
          ))}
          {pageCount > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="secondary"
                sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
              />
            </Box>
          )}
        </>
      ) : (
        <Typography sx={{ color: '#8A8A9A', mt: 2 }}>
          No reviews have been written for this movie yet.
        </Typography>
      )}
    </Stack>
  );
}