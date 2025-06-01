import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Booking System
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Schedule appointments with ease. Providers can set their availability, and clients can book time slots quickly.
        </Typography>

        {/* Optional call-to-action buttons */}
        <Box mt={3}>
          <Button component={Link} to="/booking" variant="contained" color="primary" sx={{ mr: 2 }}>
            Book Appointment
          </Button>
          <Button component={Link} to="/availability" variant="outlined" color="primary">
            Set Availability
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
