import { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Button 
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TripCard from './TripCard';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import PropTypes from 'prop-types';

const TripList = ({ WelcomeMessage, ErrorState }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await api.trips.getAll();
        console.log('TripList received data:', data); // Debug log
        
        if (!data || !data.trips) {
          throw new Error('Invalid response format');
        }
        
        setTrips(data.trips);
      } catch (err) {
        console.error('Failed to fetch trips:', err);
        setError(err.message || 'Failed to load trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Loading state with skeleton cards
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((skeleton) => (
          <Grid item xs={12} sm={6} md={4} key={skeleton}>
            <TripCard loading={true} />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Error state
  if (error) {
    return <ErrorState />;
  }

  // Empty state
  if (trips.length === 0) {
    return <WelcomeMessage />;
  }

  // Loaded state with trips
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Trips
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/trips/new')}
        >
          New Trip
        </Button>
      </Box>

      <Grid container spacing={3}>
        {trips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip.id}>
            <TripCard trip={trip} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ 
              height: '100%', 
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate('/trips/new')}
          >
            <AddIcon sx={{ mb: 1 }} />
            <Typography>Add New Trip</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

TripList.propTypes = {
  WelcomeMessage: PropTypes.elementType.isRequired,
  ErrorState: PropTypes.elementType.isRequired
};

export default TripList;
