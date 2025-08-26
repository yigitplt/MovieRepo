"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #6B4EE8 0%, #9E88FF 100%)'}}>
      <Toolbar>
        
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>

        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/profile">
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
