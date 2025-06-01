import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import { fetchAvailabilities, createAppointment } from '../components/api';

export default function BookingPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchAvailabilities().then(setSlots);
  }, []);

  const bookSlot = async (availabilityId: number) => {
    if (!clientName || !clientEmail) {
      setSnack({ open: true, message: 'Please enter your name and email', severity: 'warning' });
      return;
    }

    try {
      await createAppointment({ availabilityId, clientName, clientEmail });
      setSnack({ open: true, message: 'Appointment booked!', severity: 'success' });
      // Optionally update the local state to mark slot as booked without refetch
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === availabilityId ? { ...slot, isBooked: true } : slot
        )
      );
    } catch (err) {
      setSnack({ open: true, message: 'Booking failed', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book an Appointment
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Email"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
  {slots.map((slot) => (
    <Grid item xs={12} sm={6} md={4} key={slot.id}>
      <Card
        sx={{
          backgroundColor: slot.isBooked ? '#f8d7da' : 'white', // light red if booked
          border: slot.isBooked ? '1px solid #f44336' : 'none', // red border if booked
        }}
      >
        <CardContent>
          <Typography variant="h6">
            {slot.date}
          </Typography>
          <Typography>
            {slot.startTime} - {slot.endTime}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            with {slot.providerName}
          </Typography>
          {!slot.isBooked ? (
            <Button
              variant="contained"
              onClick={() => bookSlot(slot.id)}
              fullWidth
            >
              Book
            </Button>
          ) : (
            <Button
              variant="contained"
              fullWidth
              disabled
              color="error"
            >
              Booked
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
