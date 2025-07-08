import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const WheelOfFortune = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
          Şans Çarkı
        </Typography>
        <Typography variant="h1" sx={{ fontSize: '100px', mb: 2 }}>
          🎰
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Şans çarkı burada olacak
        </Typography>
      </Box>
    </Container>
  );
};

export default WheelOfFortune;
