"use client";

import { Box, Typography, Rating, Stack, styled, Avatar } from "@mui/material";
import { StyledRating } from "./ui/Styledrating";

const StyledReview = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#9E88FF',
  },
  '& .MuiRating-iconEmpty': {
    color: '#4D4D6B',
  },
});

type Review = {
  ratingValue: number;
  watchDate: string;
  comment: string;
  username: string;
};

type ReviewCardProps = {
  review: Review;
  title?: string; 
};

export default function ReviewCard({ review, title }: ReviewCardProps) {
  if (!review) return null;
  
    return (
    <Box
      sx={{
        bgcolor: '#1E1E2F',
        color: '#FFFFFF',
        p: { xs: 2, md: 3 },
        borderRadius: '16px',
        border: '1px solid #4D4D6B',
      }}
    >
      <Stack spacing={2}>        
        {title ? (
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        ) : (
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#6B4EE8', width: 32, height: 32, fontSize: '1rem' }}>
              {review.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="subtitle1" fontWeight="bold">
              {review.username}
            </Typography>
          </Box>
        )}

        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <StyledRating
            name="read-only-rating"
            value={review.ratingValue}
            max={10}
            readOnly
            precision={0.5}
            size="small"
          />
          <Typography variant="body2" sx={{ color: '#8A8A9A' }}>
            | Watched on: {new Date(review.watchDate).toLocaleDateString()}
          </Typography>
        </Box>

        
        {review.comment && (
          <Typography
            variant="body1"
            sx={{
              bgcolor: '#14141F',
              p: 2,
              borderRadius: '8px',
              border: '1px solid #2A2A3E',
              lineHeight: 1.7,
              fontStyle: 'italic',
              color: '#ededed',
            }}
          >
            "{review.comment}"
          </Typography>
        )}
      </Stack>
    </Box>
  );
}