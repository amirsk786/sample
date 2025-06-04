import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActions, 
  Button,
  Skeleton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const TripCard = ({ trip, onDelete, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card sx={{ maxWidth: 345, height: '100%' }}>
        <Skeleton variant="rectangular" height={140} />
        <CardContent>
          <Skeleton variant="text" height={32} width="80%" />
          <Skeleton variant="text" height={20} width="60%" />
          <Skeleton variant="text" height={20} width="40%" />
        </CardContent>
        <CardActions>
          <Skeleton variant="rectangular" width={64} height={36} />
          <Skeleton variant="rectangular" width={64} height={36} sx={{ ml: 1 }} />
        </CardActions>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={trip.imageUrl || 'https://via.placeholder.com/345x140'}
        alt={trip.destination}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {trip.destination}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {trip.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          startIcon={<EditIcon />}
          onClick={() => navigate(`/trips/${trip.id}/edit`)}
        >
          Edit
        </Button>
        <Button 
          size="small" 
          color="error" 
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(trip.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

TripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string
  }),
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default TripCard;
