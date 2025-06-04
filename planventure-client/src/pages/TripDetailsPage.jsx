import { useState, useEffect } from 'react';
import { Container, Typography, Alert, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ItineraryDay from '../components/itinerary/ItineraryDay';
import EmptyItinerary from '../components/itinerary/EmptyItinerary';
import { api } from '../services/api';
import AccommodationDetails from '../components/trip/AccommodationDetails';
import TransportationDetails from '../components/trip/TransportationDetails';

const createDefaultItinerary = (startDate, endDate) => {
  const itinerary = {};
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const dayCount = end.diff(start, 'day') + 1;

  for (let i = 0; i < dayCount; i++) {
    const currentDate = start.add(i, 'day').format('YYYY-MM-DD');
    itinerary[currentDate] = [
      {
        id: `morning-${currentDate}`,
        time: '09:00',
        activity: 'Breakfast',
        location: 'Hotel Restaurant'
      },
      {
        id: `afternoon-${currentDate}`,
        time: '13:00',
        activity: 'Lunch & Sightseeing',
        location: 'City Center'
      },
      {
        id: `evening-${currentDate}`,
        time: '19:00',
        activity: 'Dinner',
        location: 'Local Restaurant'
      }
    ];
  }

  return itinerary;
};

const TripDetailsPage = () => {
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

  const handleCreateItinerary = async () => {
    try {
      const defaultItinerary = createDefaultItinerary(trip.startDate, trip.endDate);
      const updatedTrip = await api.trips.updateItinerary(tripId, defaultItinerary);
      setTrip(updatedTrip);
    } catch {
      setError('Failed to create itinerary');
    }
  };

  const handleAddTimeSlot = async (date, timeSlot) => {
    try {
      const updatedTrip = await api.trips.addTimeSlot(tripId, date, timeSlot);
      setTrip(updatedTrip);
    } catch {
      setError('Failed to add activity');
    }
  };

  const handleUpdateTimeSlot = async (timeSlotId, data) => {
    // Example usage to avoid unused variable error
    // Implement API call to update time slot using timeSlotId and data
    console.log('Update time slot:', timeSlotId, data);
  };

  const handleDeleteTimeSlot = async (timeSlotId) => {
    // Example usage to avoid unused variable error
    // Implement API call to delete time slot using timeSlotId
    console.log('Delete time slot:', timeSlotId);
  };

  const handleUpdateAccommodation = async (accommodationData) => {
    try {
      const updatedTrip = await api.trips.updateAccommodation(tripId, accommodationData);
      setTrip(updatedTrip);
    } catch {
      setError('Failed to update accommodation details');
    }
  };

  const handleUpdateTransportation = async (transportationData) => {
    try {
      const updatedTrip = await api.trips.updateTransportation(tripId, transportationData);
      setTrip(updatedTrip);
    } catch {
      setError('Failed to update transportation details');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h4" gutterBottom>
        {trip.destination}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <AccommodationDetails
            accommodation={trip.accommodation}
            onUpdate={handleUpdateAccommodation}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransportationDetails
            transportation={trip.transportation}
            onUpdate={handleUpdateTransportation}
          />
        </Grid>
      </Grid>

      {!trip.itinerary || Object.keys(trip.itinerary).length === 0 ? (
        <EmptyItinerary onCreateItinerary={handleCreateItinerary} />
      ) : (
        Object.keys(trip.itinerary)
          .sort()
          .map((date) => (
            <ItineraryDay
              key={date}
              date={date}
              timeSlots={trip.itinerary[date] || []}
              onAddTimeSlot={handleAddTimeSlot}
              onUpdateTimeSlot={(timeSlotId, data) => 
                handleUpdateTimeSlot(timeSlotId, data)}
              onDeleteTimeSlot={(timeSlotId) => 
                handleDeleteTimeSlot(timeSlotId)}
            />
          ))
      )}
    </Container>
  );
};

export default TripDetailsPage;
