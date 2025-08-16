import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)({
  background: 'linear-gradient(90deg, #6B4EE8 0%, #9E88FF 100%)',
  color: '#FFFFFF',
  borderRadius: '8px',
  padding: '12px',
  fontWeight: 'bold',
  marginTop: '20px',
  '&:hover': {
    opacity: 0.9,
  },
});