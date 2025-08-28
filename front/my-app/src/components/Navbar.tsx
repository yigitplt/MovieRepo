"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');

    router.push('/login');
  }


  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #6B4EE8 0%, #9E88FF 100%)'}}>
      <Toolbar>
        
        <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} href="/">
          MovieRepo
        </Typography>

        <Box>
          <Button color="inherit" component={Link} href="/search">
            Search
          </Button>
          <Button color="inherit" component={Link} href="/profile">
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}> 
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
