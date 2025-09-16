import { Box, Typography } from "@mui/material";
import { getAllReviewsOfUser } from "@/src/lib/reviews"; // Assuming this is the correct import from your files
import { getWatchlist } from "@/src/lib/watchlist";
import { getMovieDetails } from "@/src/lib/movies";
import ProfileTabs from "@/src/components/ProfileTabs";

async function getMoviesDetailsFromIds(ids: number[]) {
    if (!ids || ids.length === 0) return [];

    const moviePromises = ids.map(id => 
        getMovieDetails(id)
            .catch(error => {
                console.error(`Could not fetch details for movie ID: ${id}`, error);
                return null;
            })
    );
    
    const movies = await Promise.all(moviePromises);
    
    return movies.filter(movie => movie !== null);
}


export default async function ProfilePage() {
    
    const ratings = await getAllReviewsOfUser();
    const watchlistMovieIds = await getWatchlist();

    const watchedMovieIds = ratings.map((r: any) => r.movieId);
    
    const watchedMovies = await getMoviesDetailsFromIds(watchedMovieIds);
    const watchlistMovies = await getMoviesDetailsFromIds(watchlistMovieIds);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Repo
            </Typography>
            <ProfileTabs
                watchedMovies={watchedMovies}
                watchlistMovies={watchlistMovies}
            />
        </Box>
    );
}