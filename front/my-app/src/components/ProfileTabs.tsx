"use client";

import { useState } from 'react';
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import ReviewCard from './ReviewCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}


export default function ProfileTabs({ watchedMovies, watchlistMovies}: { watchedMovies: any[], watchlistMovies: any[]}) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          <Tab label={`Watched (${watchedMovies.length})`} />
          <Tab label={`Watchlist (${watchlistMovies.length})`} />
        </Tabs>
      </Box>
      
      {/* Watched Movies Panel */}
      <TabPanel value={value} index={0}>
        {watchedMovies.length > 0 ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {watchedMovies.map((movie: any) => (
              <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
                <MovieCard id={movie.id} title={movie.title} posterPath={movie.poster_path} voteAverage={movie.vote_average} />
              </Grid>
            ))}
          </Grid>
        ) : <Typography>You haven't logged any watched movies yet.</Typography>}
      </TabPanel>

      {/* Watchlist Panel */}
      <TabPanel value={value} index={1}>
        {watchlistMovies.length > 0 ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {watchlistMovies.map((movie: any) => (
              <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
                <MovieCard id={movie.id} title={movie.title} posterPath={movie.poster_path} voteAverage={movie.vote_average} />
              </Grid>
            ))}
          </Grid>
        ) : <Typography>Your watchlist is empty.</Typography>}
      </TabPanel>

    </Box>
  );
}