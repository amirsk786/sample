import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Hotel as HotelIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const AccommodationDetails = ({ accommodation, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(accommodation || {
    name: '',
    address: '',
    checkIn: '',
    checkOut: '',
    confirmationNumber: ''
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
          <HotelIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Accommodation</Typography>
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
              fullWidth
              label="Hotel/Accommodation Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              margin="normal"
              multiline
              rows={2}
            />
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
              <TextField
                label="Check-in"
                type="datetime-local"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="Check-out"
                type="datetime-local"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
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
            {accommodation ? (
              <>
                <Typography variant="h6">{accommodation.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {accommodation.address}
                </Typography>
                <Typography variant="body2">
                  Check-in: {new Date(accommodation.checkIn).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Check-out: {new Date(accommodation.checkOut).toLocaleString()}
                </Typography>
                {accommodation.confirmationNumber && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Confirmation: {accommodation.confirmationNumber}
                  </Typography>
                )}
              </>
            ) : (
              <Typography color="text.secondary">
                No accommodation details added yet
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

AccommodationDetails.propTypes = {
  accommodation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    checkIn: PropTypes.string,
    checkOut: PropTypes.string,
    confirmationNumber: PropTypes.string
  }),
  onUpdate: PropTypes.func.isRequired
};

export default AccommodationDetails;