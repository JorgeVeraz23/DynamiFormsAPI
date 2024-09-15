import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Bienvenido a la aplicación Dynamic Forms
          </Typography>
          <Typography variant="body1" paragraph>
          Esta aplicación te permite crear, editar y gestionar formularios de manera dinámica para diferentes propósitos. Puedes crear formularios para personas, mascotas y mucho más, con nuestra interfaz intuitiva.
          </Typography>
          <Button variant="contained" color="primary" href="/form-page">
            Ver Formularios
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
