import { useState, useEffect } from 'react';
import { Container, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import EditTripForm from '../components/trips/EditTripForm';
import { api } from '../services/api';

const EditTripPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await api.trips.getById(tripId);
        setTrip(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch trip details');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!trip) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          Trip not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <EditTripForm 
        trip={trip} 
        onUpdate={(updatedTrip) => setTrip({ ...trip, ...updatedTrip })}
      />
    </Container>
  );
};

export default EditTripPage;
