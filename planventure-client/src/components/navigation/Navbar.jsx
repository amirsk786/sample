import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow:1, cursor: 'pointer', textAlign: 'left' }}
          onClick={() => navigate('/')}
        >
          Planventure
        </Typography>

        <Box>
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/trips')}
              >
                My Trips
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <Button 
                  color="inherit"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              )}
              {location.pathname !== '/signup' && (
                <Button 
                  color="inherit"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;