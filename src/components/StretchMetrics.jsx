import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

function StretchMetrics() { 
    const navigate = useNavigate();


return (
    <div>
      <h2>STRETCH METRICS</h2>
      <p>Follow guided stretches, track routines, and enhance movement efficiency.</p>
     
      <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
    </div>
  );

}

export default StretchMetrics 