import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const EmptyItinerary = ({ onCreateItinerary }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <Typography variant="h5" gutterBottom>
        No Itinerary Yet
      </Typography>
      <Typography color="text.secondary" paragraph>
        Start planning your trip by creating an itinerary with daily activities.
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreateItinerary}
        size="large"
      >
        Create Itinerary
      </Button>
    </Box>
  );
};

EmptyItinerary.propTypes = {
  onCreateItinerary: PropTypes.func.isRequired
};

export default EmptyItinerary;
