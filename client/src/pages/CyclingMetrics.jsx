import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Stack } from '@mui/material';

import ViewCyclingMetrics from '../components/ViewMetrics/ViewCyclingMetrics.jsx';

function CyclingMetrics() {    
    return (
        <Stack alignItems="center">
            <img src="/images/fitness_app_cycler.jpg" alt="caption of a cycler" width="70%"/>   
            <ViewCyclingMetrics/>

            <Stack marginTop={5}>
                <MuiLink to="../HomePage/fitnessTypes" component={RouterLink}>Back to Fitness Types</MuiLink>
            </Stack>
        </Stack>
    );
}

export default CyclingMetrics;