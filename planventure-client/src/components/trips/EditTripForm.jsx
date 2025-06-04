import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Alert,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { api } from '../../services/api';

const EditTripForm = ({ trip, onUpdate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: trip.destination,
    startDate: dayjs(trip.startDate),
    endDate: dayjs(trip.endDate),
    description: trip.description || ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate dates
      if (formData.endDate.isBefore(formData.startDate)) {
        throw new Error('End date cannot be before start date');
      }

      const updatedTripData = {
        destination: formData.destination,
        startDate: formData.startDate.format('YYYY-MM-DD'),
        endDate: formData.endDate.format('YYYY-MM-DD'),
        description: formData.description
      };

      await api.trips.update(trip.id, updatedTripData);
      if (onUpdate) onUpdate(updatedTripData);
      navigate(`/trips/${trip.id}`);
    } catch (err) {
      setError(err.message || 'Failed to update trip');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Edit Trip Details
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Destination"
        name="destination"
        value={formData.destination}
        onChange={handleChange}
        required
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <DatePicker
          label="Start Date"
          value={formData.startDate}
          onChange={(newValue) => {
            setFormData(prev => ({
              ...prev,
              startDate: newValue
            }));
          }}
          sx={{ flex: 1 }}
        />
        
        <DatePicker
          label="End Date"
          value={formData.endDate}
          onChange={(newValue) => {
            setFormData(prev => ({
              ...prev,
              endDate: newValue
            }));
          }}
          sx={{ flex: 1 }}
        />
      </Box>

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={() => navigate(`/trips/${trip.id}`)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
};

EditTripForm.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onUpdate: PropTypes.func
};

export default EditTripForm;
