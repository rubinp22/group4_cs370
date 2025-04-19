import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Stack } from '@mui/material';
import ViewHikingMetrics from '../components/ViewMetrics/ViewHikingMetrics.jsx';
import ToolBar from '../components/ToolBar.jsx';

function HikingMetrics() {
    return (
    <>
        <ToolBar /> {/* add new elements */}
        <Stack alignItems={"center"}>
            <img src="/images/fitness_app_hiker.jpg" alt="Hikers in a trail" width="70%"/>
            <ViewHikingMetrics/>

            <Stack marginTop={5}>
                <MuiLink to="../HomePage/fitnessTypes" component={RouterLink}>Back to Fitness Types</MuiLink>
            </Stack>
        </Stack>
    </>
    );

}

export default HikingMetrics 