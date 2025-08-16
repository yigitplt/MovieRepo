import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#2A2A3E',
    color: '#FFFFFF',
    borderRadius: '8px',
    '&.Mui-focused': {
      backgroundColor: '#2A2A3E',
    },
    '&:hover': {
      backgroundColor: '#38384F',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4D4D6B',
  },
  '& .MuiInputLabel-root': {
    color: '#8A8A9A',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#9E88FF',
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: '#8A8A9A',
  },
});