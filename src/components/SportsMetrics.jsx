import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

function SportsMetrics() { 
    const navigate = useNavigate();


return (
    <div>
      <h2>SPORTS METRICS</h2>
      <p>Sports improve your agility, coordination, and overall fitness. Use this section to log each practice sessions and performance stats.</p>
     
      <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
    </div>
  );

}

export default SportsMetrics 