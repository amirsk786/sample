import { useState, useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TripList from '../components/trips/TripList';
import ErrorState from '../components/feedback/ErrorState';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.trips.getAll();
      setTrips(response.trips);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      setError(error.message || 'Failed to load trips');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    try {
      await api.trips.delete(tripId);
      setTrips(trips.filter(trip => trip.id !== tripId));
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  if (error) {
    return (
      <Container maxWidth="lg">
        <ErrorState 
          message={error}
          onRetry={fetchTrips}
        />
      </Container>
    );
  }

  if (!isLoading && trips.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.email}!
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Ready to plan your next adventure?
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => navigate('/trips/new')}
          >
            Create Your First Trip
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <TripList 
        trips={trips}
        onDeleteTrip={handleDeleteTrip}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default TripsPage;