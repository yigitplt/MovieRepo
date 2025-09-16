"use client"

import { useState } from "react";
import axiosInstance from "../lib/axiosInstance";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StyledTextField } from "./ui/StyledTextField";
import { StyledButton } from "./ui/StyledButton";
import { styled } from "@mui/material";
import theme from "@/theme";
import { set } from "date-fns";
import { StyledRating } from "./ui/Styledrating";
import { useRouter } from "next/navigation";


export default function MovieLog({movieId}: {movieId: number}) {
    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState<string>("");
    const [watchDate, setWatchDate] = useState(new Date());
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const payload = {
            movieId: movieId,
            rating: rating,
            watchDate: watchDate.toISOString().split('T')[0],
            comment: review,
        };

        try {
            const response = await axiosInstance.post('/ratings', payload);
            setSuccess(true);
            router.push('/movie/' + movieId);
        } catch (err) {
            console.error('Failed to submit log:', err);
            setError('Failed to submit your log. Please try again.');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{p: 2, border: '1px solid #ccc', borderRadius: '8px' }}
            >
                <Stack spacing={3}>
                    <Typography variant="h6">Add This Movie To Your Repo</Typography>

                    <div>
                        <Typography component="legend">Your Rating</Typography>
                        <StyledRating
                            name="movie-rating"
                            value={rating}
                            precision={0.5} 
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            size="large"
                            max={10} 
                        />
                        
                    </div>

                    <DatePicker
                        label="Watched Date"
                        value={watchDate}
                        onChange={(newValue) => {
                            setWatchDate(newValue as Date);
                        }}
                        enableAccessibleFieldDOMStructure={false}
                        slots={{ textField: StyledTextField }}
                    />

                    <StyledTextField
                        label="Review"
                        multiline
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />

                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="success">Saved Successfully!</Typography>}

                    <StyledButton type="submit" variant="contained" size="large">
                        Save
                    </StyledButton>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
}