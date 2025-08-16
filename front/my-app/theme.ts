import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', 
    background: {
      default: '#14141F',
      paper: '#1E1E2F',
    },
    primary: {
      main: '#6B4EE8', 
    },
    secondary: {
      main: '#9E88FF', 
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8A8A9A', 
    },
    divider: '#4D4D6B', 
  },
  
});

export default theme;