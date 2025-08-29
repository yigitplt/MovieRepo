"use client"

import theme from "@/theme";
import { Rating, styled } from "@mui/material";

export const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: theme.palette.primary.main,
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.secondary.main,
  },
});