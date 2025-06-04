import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TimeSlot from './TimeSlot';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ItineraryDay = ({ 
  date,
  timeSlots,
  onAddTimeSlot,
  onUpdateTimeSlot,
  onDeleteTimeSlot
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState({
    time: '09:00',
    activity: '',
    location: ''
  });

  const handleAddTimeSlot = () => {
    onAddTimeSlot(date, newTimeSlot);
    setNewTimeSlot({
      time: '09:00',
      activity: '',
      location: ''
    });
    setIsDialogOpen(false);
  };

  const sortedTimeSlots = [...timeSlots].sort((a, b) => 
    a.time.localeCompare(b.time)
  );

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">
          {dayjs(date).format('dddd, MMMM D')}
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Activity
        </Button>
      </Box>

      {sortedTimeSlots.map((timeSlot) => (
        <TimeSlot
          key={timeSlot.id}
          timeSlot={timeSlot}
          onUpdate={(id, data) => onUpdateTimeSlot(date, id, data)}
          onDelete={(id) => onDeleteTimeSlot(date, id)}
        />
      ))}

      {timeSlots.length === 0 && (
        <Typography color="text.secondary" textAlign="center" py={3}>
          No activities planned for this day
        </Typography>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Time"
              type="time"
              value={newTimeSlot.time}
              onChange={(e) => setNewTimeSlot({ ...newTimeSlot, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Location"
              value={newTimeSlot.location}
              onChange={(e) => setNewTimeSlot({ ...newTimeSlot, location: e.target.value })}
            />
            <TextField
              label="Activity"
              multiline
              rows={3}
              value={newTimeSlot.activity}
              onChange={(e) => setNewTimeSlot({ ...newTimeSlot, activity: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddTimeSlot}
            variant="contained"
            disabled={!newTimeSlot.activity || !newTimeSlot.location}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

ItineraryDay.propTypes = {
  date: PropTypes.string.isRequired,
  timeSlots: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      activity: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired
    })
  ).isRequired,
  onAddTimeSlot: PropTypes.func.isRequired,
  onUpdateTimeSlot: PropTypes.func.isRequired,
  onDeleteTimeSlot: PropTypes.func.isRequired
};

export default ItineraryDay;
