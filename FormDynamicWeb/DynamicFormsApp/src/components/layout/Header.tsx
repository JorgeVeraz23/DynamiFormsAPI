// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ handleDrawerToggle, drawerWidth }: { handleDrawerToggle: () => void, drawerWidth: number }) => {
  return (
    <AppBar
  position="fixed"
  sx={{
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    ml: { sm: `${drawerWidth}px` },
    bgcolor: '#1976d2',
    zIndex: (theme) => theme.zIndex.drawer + 1 // Asegúrate de que el header esté encima del drawer
  }}
>

  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
      Dynamic Forms App
    </Typography>
  </Toolbar>
</AppBar>
  );
};

export default Header;
