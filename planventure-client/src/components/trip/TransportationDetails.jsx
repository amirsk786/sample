import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  DirectionsCar as TransportIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const transportTypes = [
  'Flight',
  'Train',
  'Bus',
  'Car Rental',
  'Other'
];

const TransportationDetails = ({ transportation, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(transportation || {
    type: 'Flight',
    provider: '',
    departureTime: '',
    arrivalTime: '',
    confirmationNumber: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TransportIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Transportation</Typography>
          {!isEditing && (
            <IconButton 
              size="small" 
              sx={{ ml: 'auto' }}
              onClick={() => setIsEditing(true)}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>

        {isEditing ? (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              margin="normal"
              required
            >
              {transportTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Provider"
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              margin="normal"
              required
            />
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
              <TextField
                label="Departure"
                type="datetime-local"
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="Arrival"
                type="datetime-local"
                value={formData.arrivalTime}
                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
            <TextField
              fullWidth
              label="Confirmation Number"
              value={formData.confirmationNumber}
              onChange={(e) => setFormData({ ...formData, confirmationNumber: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              margin="normal"
              multiline
              rows={2}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            {transportation ? (
              <>
                <Typography variant="subtitle1">
                  {transportation.type} - {transportation.provider}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Departure: {new Date(transportation.departureTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Arrival: {new Date(transportation.arrivalTime).toLocaleString()}
                </Typography>
                {transportation.confirmationNumber && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Confirmation: {transportation.confirmationNumber}
                  </Typography>
                )}
                {transportation.notes && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {transportation.notes}
                  </Typography>
                )}
              </>
            ) : (
              <Typography color="text.secondary">
                No transportation details added yet
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

TransportationDetails.propTypes = {
  transportation: PropTypes.shape({
    type: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    departureTime: PropTypes.string,
    arrivalTime: PropTypes.string,
    confirmationNumber: PropTypes.string,
    notes: PropTypes.string
  }),
  onUpdate: PropTypes.func.isRequired
};

export default TransportationDetails;