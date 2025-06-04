import { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const TimeSlot = ({ 
  timeSlot, 
  onUpdate, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    time: timeSlot.time,
    activity: timeSlot.activity,
    location: timeSlot.location
  });

  const handleSave = () => {
    onUpdate(timeSlot.id, editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      time: timeSlot.time,
      activity: timeSlot.activity,
      location: timeSlot.location
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Time"
              type="time"
              value={editedData.time}
              onChange={(e) => setEditedData({ ...editedData, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 150 }}
            />
            <TextField
              fullWidth
              label="Location"
              value={editedData.location}
              onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
            />
          </Box>
          <TextField
            fullWidth
            label="Activity"
            multiline
            rows={2}
            value={editedData.activity}
            onChange={(e) => setEditedData({ ...editedData, activity: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <IconButton onClick={handleCancel} color="error">
              <CancelIcon />
            </IconButton>
            <IconButton onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" color="primary">
            {timeSlot.time}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(timeSlot.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body1" gutterBottom>
          {timeSlot.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {timeSlot.activity}
        </Typography>
      </CardContent>
    </Card>
  );
};

TimeSlot.propTypes = {
  timeSlot: PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TimeSlot;
