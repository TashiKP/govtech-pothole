import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, IconButton, Drawer, List, ListItem, ListItemText, Avatar, Box, ListItemIcon } from '@mui/material';
import { MoreVert as MoreVertIcon, Home as HomeIcon, Info as InfoIcon, CameraAlt as CameraAltIcon, Settings as SettingsIcon, Logout as LogoutIcon } from '@mui/icons-material'; // Importing new icons
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)} // Open the drawer
            >
              <MoreVertIcon sx={{ fontSize: '2rem' }} />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              Pothole Detection
            </Typography>

            <Button
              color="inherit"
              component={Link}
              to="/about"
              sx={{
                fontSize: '0.9rem',
                padding: '8px 16px',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  cursor: 'pointer',
                  transform: 'scale(1.1)',
                },
              }}
            >
              About
            </Button>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)} // Close the drawer
        PaperProps={{
          sx: {
            width: 300, // Adjust width as needed
            backgroundColor: '#1976d2', // Match nav bar color
            color: '#ffffff', // White text for better contrast
          },
        }}
      >
        {/* Profile Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Avatar
            sx={{
              bgcolor: '#ffffff',
              color: '#1976d2',
              width: 70,
              height: 70,
              fontSize: '1.5rem',
            }}
          >
            P
          </Avatar>
          <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold' }}>
            Profile Name
          </Typography>
          <Typography variant="body2">example@email.com</Typography>
        </Box>

        {/* Navigation Links */}
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <HomeIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: '#ffffff' }} />
          </ListItem>

          

          <ListItem button component={Link} to="/detect" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <CameraAltIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Detect Potholes" sx={{ color: '#ffffff' }} />
          </ListItem>

          {/* Settings */}
          <ListItem button component={Link} to="/settings" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: '#ffffff' }} />
          </ListItem>

          <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <InfoIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="About" sx={{ color: '#ffffff' }} />
          </ListItem>

          {/* Log Out */}
          <ListItem button onClick={() => alert('Logging Out')} sx={{ marginTop: 'auto' }}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Log Out" sx={{ color: '#ffffff' }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
