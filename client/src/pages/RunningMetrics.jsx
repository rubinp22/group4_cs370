import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Stack } from '@mui/material';

import ViewRunningMetrics from '../components/ViewMetrics/ViewRunningMetrics.jsx';

function RunningMetrics() {
    return (
        <Stack alignItems={"center"}>
            <img src="/images/fitness_app_runner.jpg" alt="Runner in background" width="70%"/>
            <ViewRunningMetrics/>

            <Stack marginTop={5}>
                <MuiLink to="../HomePage/fitnessTypes" component={RouterLink}>Back to Fitness Types</MuiLink>
            </Stack>
        </Stack>

    );

}

export default RunningMetrics
