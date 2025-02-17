import { useNavigate, Link } from 'react-router-dom';
import { Stack } from '@mui/material';

function FitnessTypesPage () {
    const navigate = useNavigate();

    // Eventually we might consider replacing these h2 and p elements with Typography elements from MUI
    // They allow for more robust customization that doesn't rely on CSS classes, like pointer-hover
    return (
      <Stack direction="column" gap={3} marginBottom={3}>
        <h2>Fitness Type</h2>
        <Link to="./RunningMetrics" className="link">RUNNING</Link>
        <Link to="./HikingMetrics" className="link">HIKING</Link>
        <Link to="./CyclingMetrics" className="link">CYCLING</Link>
        <Link to="./SwimmingMetrics" className="link">SWIMMING</Link>
        <Link to="./WeightLiftingMetrics" className="link">WEIGHT LIFTING</Link>
        <Link to="./SportsSelection" className="link">SPORTS</Link>

        <Link to="../" className="button-link">Back to Home</Link>
      </Stack>
    );
}

export default FitnessTypesPage