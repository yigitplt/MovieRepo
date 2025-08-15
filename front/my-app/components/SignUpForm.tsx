"use client"

import axiosInstance from '@/lib/axiosInstance';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

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
        minHeight: '100vh'
        }}
        >
    <Paper 
     elevation={3}
     sx={{ 
        p: 4, 
        maxWidth: 400,
        borderRadius: 8}}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Username"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>

      {message && (
        <Typography sx={{ mt: 2 }} color={message.startsWith("Error") ? "error" : "success.main"}>
          {message}
        </Typography>
      )}
    </Paper>
    </Box>
  );


}