// src/layouts/MainLayout.tsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItemIcon, ListItemText, Toolbar, Divider, ListItemButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import Header from './Header';
import Footer from './Footer';

const drawerWidth = 240;  // Define the drawer width here

const MainLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <img src="your-logo-url.png" alt="App Logo" style={{ width: '100%', padding: '10px' }} />
      </Toolbar>
      <List>
        <ListItemButton onClick={() => navigate('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/about')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>

        <Divider sx={{ my: 1 }} /> {/* Línea separadora */}

        <ListItemButton onClick={() => navigate('/form-page')}>
          <ListItemIcon>
            <PersonIcon /> {/* Icono de persona */}
          </ListItemIcon>
          <ListItemText primary="Person Form" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/pet-form')}>
          <ListItemIcon>
            <PetsIcon /> {/* Icono de mascota */}
          </ListItemIcon>
          <ListItemText primary="Pet Form" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu options"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
  component="main"
  sx={{ 
    flexGrow: 1, 
    p: 3, 
    ml: `${drawerWidth}px`,   // Ajuste del margen izquierdo
    display: 'flex', 
    justifyContent: 'center',  // Centrar horizontalmente
    alignItems: 'center',      // Centrar verticalmente
    minHeight: '100vh',
    width: '100%'              // Asegurar que ocupe todo el ancho
  }}
>
  <Toolbar />
  <Outlet />
</Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
