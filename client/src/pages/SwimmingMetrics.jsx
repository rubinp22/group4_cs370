import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Stack } from '@mui/material';

import ViewSwimmingMetrics from '../components/ViewMetrics/ViewSwimmingMetrics.jsx';

function SwimmingMetrics() {
    return (
        <Stack alignItems={"center"}>
            <img src="/images/fitness_app_swimmer.jpg" alt="A Person is swimming laps" width="70%"/>
            <ViewSwimmingMetrics/>

            <Stack marginTop={5}>
                <MuiLink to="../HomePage/fitnessTypes" component={RouterLink}>Back to Fitness Types</MuiLink>
            </Stack>
        </Stack>

    );

}

export default SwimmingMetrics