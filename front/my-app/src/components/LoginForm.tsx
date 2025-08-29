"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";
import { Box, Typography } from "@mui/material";
import { StyledPaper } from "./ui/StyledPaper";
import { StyledButton } from "./ui/StyledButton";
import { StyledTextField } from "./ui/StyledTextField";
import { useRouter } from "next/navigation";

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {

    const {control, handleSubmit, reset} = useForm<LoginFormValues>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await axiosInstance.post('/auth/login', data);
            router.push('/');
        } catch (error: any) {
            if(error.response) {
                setMessage(error.response.data.message || "Wrong username or password.");
            } else{
                setMessage("Error: Unable to connect to the server.");
            }
        }
    }

    return(
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#14141F',
                padding: '20px',
            }}
        >
            <StyledPaper>
                <Box sx={{ mb: 4, textAlign: 'left' }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#FFFFFF', mb: 1 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8A8A9A' }}>
                        Please enter your credentials to log in
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <StyledTextField
                                {...field}
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <StyledTextField
                                {...field}
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    {message && (
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            {message}
                        </Typography>
                    )}
                    <StyledButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Log In
                    </StyledButton>
                    <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#8A8A9A' }}>
                        Don't have an account? <a href="/signup" style={{ color: '#6B4EE8' }}>Sign Up</a>
                    </Typography>
                </form>
            </StyledPaper>
        </Box>
    );

    

    

}