import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

function HikingMetrics() { 
    const navigate = useNavigate();


return (
    <div>
      <h2>HIKING METRICS</h2>
      <p>Plan your hikes, log trails, and track elevation gains.</p>

      <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
    </div>
  );

}

export default HikingMetrics 