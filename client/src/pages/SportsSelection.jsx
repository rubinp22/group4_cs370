import { Link } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';

function SportsSelection() { 

return (
    <div>
      <h2>SPORTS METRICS</h2>
      <p>Sports metrics coming soon!</p>
      <Link to="../HomePage/fitnessTypes" className="button-link">Back to Fitness Types</Link>
    </div>
  );

}

export default SportsSelection 