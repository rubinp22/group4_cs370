import { Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';


function FitnessTypesPage () {

    return (
      <Stack direction="column" gap={3} marginBottom={3}>
        <Typography fontSize={36}>Fitness Type</Typography>
        <MuiLink to="./RunningMetrics" component={RouterLink} className="link">RUNNING</MuiLink>
        <MuiLink to="./HikingMetrics" component={RouterLink} className="link">HIKING</MuiLink>
        <MuiLink to="./CyclingMetrics" component={RouterLink} className="link">CYCLING</MuiLink>
        <MuiLink to="./SwimmingMetrics" component={RouterLink} className="link">SWIMMING</MuiLink>
        <MuiLink to="./WeightLiftingMetrics" component={RouterLink} className="link">WEIGHT LIFTING</MuiLink>
        <MuiLink to="./SportsSelection" component={RouterLink} className="link">SPORTS</MuiLink>

        <Button to="../" component={RouterLink}>Back to Home</Button>
      </Stack>
    );
}

export default FitnessTypesPage