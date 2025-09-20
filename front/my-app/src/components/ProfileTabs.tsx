"use client";

import { useState } from 'react';
import { Box, Tabs, Tab, Grid, Typography, Pagination } from '@mui/material';
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

const MOVIES_PER_PAGE = 20;

export default function ProfileTabs({ watchedMovies, watchlistMovies}: { watchedMovies: any[], watchlistMovies: any[]}) {
  const [value, setValue] = useState(0);
  const [watchedPage, setWatchedPage] = useState(1);
  const [watchlistPage, setWatchlistPage] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const watchedPagesCount = Math.ceil(watchedMovies.length / MOVIES_PER_PAGE);
  const watchlistPagesCount = Math.ceil(watchlistMovies.length / MOVIES_PER_PAGE);

  const watchedMoviesToShow = watchedMovies.slice((watchedPage - 1) * MOVIES_PER_PAGE, watchedPage * MOVIES_PER_PAGE);
  const watchlistMoviesToShow = watchlistMovies.slice((watchlistPage - 1) * MOVIES_PER_PAGE, watchlistPage * MOVIES_PER_PAGE);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          <Tab label={`Watched (${watchedMovies.length})`} />
          <Tab label={`Watchlist (${watchlistMovies.length})`} />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        {watchedMovies.length > 0 ? (
          <>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {watchedMoviesToShow.map((movie: any) => (
                <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
                  <MovieCard id={movie.id} title={movie.title} posterPath={movie.poster_path} voteAverage={movie.vote_average} />
                </Grid>
              ))}
            </Grid>
            {watchedPagesCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={watchedPagesCount}
                  page={watchedPage}
                  onChange={(event, page) => setWatchedPage(page)}
                  color="secondary"
                  sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
                />
              </Box>
            )}
          </>
        ) : <Typography>You haven't logged any watched movies yet.</Typography>}
      </TabPanel>

      
      <TabPanel value={value} index={1}>
        {watchlistMovies.length > 0 ? (
          <>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {watchlistMoviesToShow.map((movie: any) => (
                <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
                  <MovieCard id={movie.id} title={movie.title} posterPath={movie.poster_path} voteAverage={movie.vote_average} />
                </Grid>
              ))}
            </Grid>
            {watchlistPagesCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={watchlistPagesCount}
                  page={watchlistPage}
                  onChange={(event, page) => setWatchlistPage(page)}
                  color="secondary"
                  sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
                />
              </Box>
            )}
          </>
        ) : <Typography>Your watchlist is empty.</Typography>}
      </TabPanel>

    </Box>
  );
}