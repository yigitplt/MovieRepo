"use client";

import { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Button, CircularProgress } from "@mui/material";
import { BookmarkAddOutlined, BookmarkAdded } from "@mui/icons-material";
import { StyledButton } from "./ui/StyledButton";

type WatchlistButtonProps = {
  movieId: number;
  initialIsOnWatchlist: boolean;
};

export default function WatchlistButton({ movieId, initialIsOnWatchlist }: WatchlistButtonProps) {
  const [isOnWatchlist, setIsOnWatchlist] = useState(initialIsOnWatchlist);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (isOnWatchlist) {
        await axiosInstance.delete(`/watchlist/${movieId}`);
        setIsOnWatchlist(false);
      } else {
        await axiosInstance.post(`/watchlist/${movieId}`);
        setIsOnWatchlist(true);
      }
    } catch (error) {
      console.error("Failed to update watchlist", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledButton
      variant="outlined"
      onClick={handleClick}
      disabled={isLoading}
      startIcon={isLoading ? <CircularProgress size={20} /> : isOnWatchlist ? <BookmarkAdded /> : <BookmarkAddOutlined />}
      fullWidth
    >
      {isLoading ? "Updating..." : isOnWatchlist ? "On Watchlist" : "Add to Watchlist"}
    </StyledButton>
  );
}