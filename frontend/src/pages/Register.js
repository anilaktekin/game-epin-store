import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Register = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
          Kayıt Ol
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Kayıt formu burada olacak
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
