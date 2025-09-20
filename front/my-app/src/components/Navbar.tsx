"use client";

import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "../lib/axiosInstance";
import { MovieFilter, ExploreOutlined, Search, AccountCircleOutlined, LogoutOutlined } from "@mui/icons-material";
import theme from "@/theme";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post('/auth/logout');
      if (res.status === 200) {
        router.push('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navButtonStyles = {
    color: '#ededed',
    textTransform: 'none',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF'
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(20, 20, 31, 0.7)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={1} 
          component={Link} 
          href="/" 
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MovieFilter sx={{ color: theme.palette.secondary.main }}/>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            MovieRepo
          </Typography>
        </Stack>

        <Box>
          <Button sx={navButtonStyles} component={Link} href="/discover" startIcon={<ExploreOutlined />}>
            Discover
          </Button>
          <Button sx={navButtonStyles} component={Link} href="/search" startIcon={<Search />}>
            Search
          </Button>
          <Button sx={navButtonStyles} component={Link} href="/profile" startIcon={<AccountCircleOutlined />}>
            Profile
          </Button>
          <Button sx={navButtonStyles} onClick={handleLogout} startIcon={<LogoutOutlined />}> 
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}