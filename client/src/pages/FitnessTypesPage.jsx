import { Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';


function FitnessTypesPage () {

    // Responsive Design based on screen width
    const linkStyling = {
      fontSize: {lg: 18, md: 16, sm: 14, xs: 12},
      width: {lg: 200, md: 175, sm: 165, xs: 150}
    }

    return (
      <Stack direction="column" gap={3} marginBottom={3} alignItems={"center"}>
        <Typography fontSize={36}>Fitness Type</Typography>
        <MuiLink sx={linkStyling} to="./RunningMetrics" component={RouterLink}>RUNNING</MuiLink>
        <MuiLink sx={linkStyling} to="./HikingMetrics" component={RouterLink}>HIKING</MuiLink>
        <MuiLink sx={linkStyling} to="./CyclingMetrics" component={RouterLink}>CYCLING</MuiLink>
        <MuiLink sx={linkStyling} to="./SwimmingMetrics" component={RouterLink}>SWIMMING</MuiLink>
        <MuiLink sx={linkStyling} to="./WeightLiftingMetrics" component={RouterLink}>WEIGHT LIFTING</MuiLink>
        <MuiLink sx={linkStyling} to="./SportsSelection" component={RouterLink}>SPORTS</MuiLink>

        <Button sx={linkStyling} to="../HomePage" component={RouterLink}>Back to Home</Button>
      </Stack>
    );
}

export default FitnessTypesPage