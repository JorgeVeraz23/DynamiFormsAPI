import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome to the Dynamic Forms App
          </Typography>
          <Typography variant="body1" paragraph>
            This app allows you to dynamically create, edit, and manage forms for different purposes. You can create forms for persons, pets, and much more, with our intuitive interface.
          </Typography>
          <Button variant="contained" color="primary" href="/person-form">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
