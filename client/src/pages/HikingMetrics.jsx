import { Link as RouterLink } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import { useState } from 'react';
import MuiLink from '@mui/material/Link';

import InputHikingExercise from '../components/InputMetrics/InputHikingExercise.jsx';
import ViewHikingMetrics from '../components/ViewMetrics/ViewHikingMetrics.jsx';

function HikingMetrics() {
    const [editingData, setEditingData] = useState(false);

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }

    return (
        <Stack alignItems={"center"}>
            <ViewHikingMetrics/>
            {!editingData ? (
                <></>
            ) : (
                <Stack width="82%">
                    <InputHikingExercise/>
                </Stack>
            )}

            <Stack direction="row" marginTop={5} spacing={5} justifyContent="center">
                <Button variant="contained" 
                    onClick={handleEdit}
                >
                    {editingData ? "Stop Editing" : "Edit Data"}
                </Button>
                <MuiLink to="../fitnessTypes" component={RouterLink} className="button-link">Back to Fitness Types</MuiLink>
            </Stack>

        </Stack>
    
    );

}

export default HikingMetrics 