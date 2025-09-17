"use client";

import { useState } from "react";
import { StyledButton } from "@/src/components/ui/StyledButton";
import { Box, Typography } from "@mui/material";
import DiscoverWizard from "@/src/components/DiscoverWizard";

export default function DiscoverPage() {
    const [isStarted, setIsStarted] = useState(false);

    if (isStarted) {
        return <DiscoverWizard />;
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '80vh',
            textAlign: 'center'
        }}>
            <Typography variant="h4" gutterBottom>Can't decide what to watch?</Typography>
            <Typography sx={{ mb: 2 }}>Answer a few questions and we'll find the perfect movie for you.</Typography>
            <StyledButton onClick={() => setIsStarted(true)}>
                Pick A Movie For Me
            </StyledButton>
        </Box>
    );
}