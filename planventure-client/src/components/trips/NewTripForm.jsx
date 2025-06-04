import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const NewTripForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: dayjs(),
    endDate: dayjs().add(7, 'day'),
    description: ''
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

      const tripData = {
        destination: formData.destination,
        startDate: formData.startDate.format('YYYY-MM-DD'),
        endDate: formData.endDate.format('YYYY-MM-DD'),
        description: formData.description
      };

      await api.trips.create(tripData);
      navigate('/trips');
    } catch (err) {
      setError(err.message || 'Failed to create trip');
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          Plan New Trip
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
            onClick={() => navigate('/trips')}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Trip'}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default NewTripForm;
