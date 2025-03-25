import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

function GoalsMetrics() { 
    const navigate = useNavigate();


return (
    <div>
      <h2>FITNESS GOALS</h2>
      <p>Set milestones, monitor progress, and stay on track.</p>

      <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
    </div>
  ); 

}

export default GoalsMetrics 