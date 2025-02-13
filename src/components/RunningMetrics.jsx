import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

function RunningMetrics() {
    const navigate = useNavigate();


return (
    <div>
      <h2>RUNNING METRICS</h2>
      <p>Log your runs, track your pace, and set new goals.</p>

      <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
    </div>
  );

}

export default RunningMetrics 