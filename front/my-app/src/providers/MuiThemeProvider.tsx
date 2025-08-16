"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides a consistent baseline for styling */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}