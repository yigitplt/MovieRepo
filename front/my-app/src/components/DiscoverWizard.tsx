import { useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Stack, Button } from '@mui/material';
import { getRecommendations } from '../lib/recommendations';
import { StyledButton } from './ui/StyledButton';
import MovieCard from './MovieCard';

const moodOptions = { "😂 Laugh": "35", "😱 Thrill": "53", "💥 Action": "28", "💖 Romance": "10749" };
const timeOptions = { "Quick Watch (< 1h 45m)": 105, "Standard Movie (~2h)": 135, "An Epic (> 2h 15m)": null };
const eraOptions = {
    "Brand New (2020s)": { gte: "2020-01-01", lte: "" },
    "A 2000s Gem": { gte: "2000-01-01", lte: "2009-12-31" },
    "A 90s Classic": { gte: "1990-01-01", lte: "1999-12-31" },
};

export default function DiscoverWizard(){
    const [step, setStep] = useState(1);
    const [preferences, setPreferences] = useState<any>({});
    const [results, setResults] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSelect = (key: string, value: any) => {
        setPreferences((prev: any) => ({ ...prev, [key]: value }));
        setStep(prev => prev + 1);
    };

    const findMovies = async (finalPrefs: any) => {
        setLoading(true);
        const movieResults = await getRecommendations(finalPrefs);
        setResults(movieResults);
        setCurrentIndex(0);
        setLoading(false);
    };

    const handleReset = () => {
        setStep(1);
        setPreferences({});
        setResults(null);
    };
    
    if (loading) return <CircularProgress />;

    
    if (results) { 
        if (results.length > 0) {
            const movie = results[currentIndex];
            return (
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>We think you'll like this...</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                        <Box sx={{ maxWidth: '300px' }}>
                            <MovieCard id={movie.id} title={movie.title} posterPath={movie.poster_path} voteAverage={movie.vote_average} />
                        </Box>
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <StyledButton onClick={() => setCurrentIndex(prev => (prev + 1) % results.length)}>Show Me Another</StyledButton>
                        <Button variant="outlined" onClick={handleReset}>Start Over</Button>
                    </Stack>
                </Box>
            );
        } else {
            return (
                <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '80vh',
                    textAlign: 'center'       
                    }}>
                    <Typography variant="h5" gutterBottom>No movies found!</Typography>
                    <Typography sx={{ mb: 2 }}>We couldn't find any movies matching your specific criteria. Please try a different combination.</Typography>
                    <StyledButton onClick={handleReset}>Try Again</StyledButton>
                </Box>
            );
        }
    }

    switch (step) {
        case 1:
            return <Question title="Who are you watching with?" options={["Just Me", "With a Partner", "With Friends"]} onSelect={(val) => handleSelect('social', val)} />;
        case 2:
            return <Question title="What's the mood for tonight?" options={moodOptions} onSelect={(val) => handleSelect('genreId', val)} />;
        case 3:
            return <Question title="How much time do you have?" options={timeOptions} onSelect={(val) => handleSelect('maxRuntime', val)} />;
        case 4:
            return <Question title="Feeling new or nostalgic?" options={eraOptions} onSelect={(val) => {
                const finalPrefs = { ...preferences, releaseDateGte: val.gte, releaseDateLte: val.lte };
                setPreferences(finalPrefs);
                findMovies(finalPrefs);
            }} />;
        default:
            return null;
    }
}


function Question({ title, options, onSelect }: { title: string, options: any, onSelect: (value: any) => void }) {
    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '80vh',
            textAlign: 'center' 
            }}>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                {(Array.isArray(options) ? options : Object.keys(options)).map(key => (
                    <Grid key={key}>
                        <StyledButton onClick={() => onSelect(Array.isArray(options) ? key : options[key])} sx={{ minWidth: '180px' }}>
                            {key}
                        </StyledButton>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}