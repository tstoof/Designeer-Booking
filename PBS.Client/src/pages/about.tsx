import { Container, Typography, Paper, Box } from '@mui/material';

export const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Our Apothecary
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our apothecary, where care and health come first. We are proud to offer personal and professional pharmaceutical services to our community.
        </Typography>
        <Typography variant="body1" paragraph>
          Our services include prescription pickups, health consultations, vaccinations, and screenings. We strive to create a safe and accessible healthcare environment for everyone.
        </Typography>
        <Typography variant="body1" paragraph>
          Our dedicated team of pharmacists and assistants is here to answer your questions and support your well-being.
        </Typography>
        <Box mt={3}>
          <Typography variant="h6">Opening Hours:</Typography>
          <Typography>Monday - Friday: 08:00 - 18:00</Typography>
          <Typography>Saturday: 09:00 - 13:00</Typography>
          <Typography>Sunday: Closed</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

