import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Stack } from '@mui/material';

import ViewWeightliftingMetrics from '../components/ViewMetrics/ViewWeightliftingMetrics.jsx';

function WeightLiftingMetrics() {
    return (
        <Stack alignItems={"center"}>
            <img src="/images/fitness_app_weights.jpg" alt="Gym that contains some weights" width="70%"/>
            <ViewWeightliftingMetrics/>

            <Stack marginTop={5}>
                <MuiLink to="../HomePage/fitnessTypes" component={RouterLink}>Back to Fitness Types</MuiLink>
            </Stack>
        </Stack>
    
    );
}

export default WeightLiftingMetrics