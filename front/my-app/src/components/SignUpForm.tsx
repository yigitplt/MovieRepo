"use client"

import axiosInstance from '@/src/lib/axiosInstance';
import { Mail, Person, Lock } from '@mui/icons-material';
import { Box, Button, Checkbox, InputAdornment, Paper, styled, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyledPaper } from './ui/StyledPaper';
import { StyledTextField } from './ui/StyledTextField';
import { StyledButton } from './ui/StyledButton';


const StyledCheckbox = styled(Checkbox)({
  color: '#6B4EE8',
  '&.Mui-checked': {
    color: '#9E88FF',
  },
});


interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

export default function SignUpForm() {

    const {control, handleSubmit, reset} = useForm<SignUpFormValues>({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    const [message, setMessage] = useState<string | null>(null);

    const onSubmit = async (data: SignUpFormValues) => {
        try{
            const res = await axiosInstance.post('/auth/signup', data);
            setMessage(`User ${res.data.username} created successfully!`);
            reset();
        } catch (error: any) {
            if(error.response) {
                setMessage(error.response.data.message || "An error occurred during signup.");
            } else{
                setMessage("Error: Unable to connect to the server.");
            }
        }
    }

    return (
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
            Welcome to my app
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A8A9A' }}>
            Kindly fill in your details below to create an account
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="Username"
                placeholder="Choose a username"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email address is required",
              pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
            }}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="Email Address"
                placeholder="Enter your email address"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            }}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="Password"
                placeholder="Create a password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          

          
          {message && (
            <Typography sx={{ mt: 2 }} color={message.startsWith("Account created") ? "#9E88FF" : "#FF6B6B"}>
              {message}
            </Typography>
          )}
          <StyledButton type="submit" fullWidth>
            Register Account
          </StyledButton>
        </form>
      </StyledPaper>
    </Box>
  );


}