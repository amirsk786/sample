import { Box, Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ErrorState = ({ message, onRetry }) => {
  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <img 
        src="/undraw_traveling_yhxq.svg"
        alt="Error illustration"
        style={{ 
          maxWidth: '300px',
          width: '100%',
          marginBottom: '1rem'
        }}
      />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Oops! Something went wrong
      </Typography>
      <Typography color="text.secondary" paragraph>
        {message || "We're having trouble loading your trips. Please try again."}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func
};

export default ErrorState;