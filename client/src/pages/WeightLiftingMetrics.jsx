import { Link as RouterLink } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import { useState } from 'react';
import MuiLink from '@mui/material/Link';

import InputWeightliftingExercise from '../components/InputMetrics/InputWeightliftingExercise.jsx';
import ViewWeightliftingMetrics from '../components/ViewMetrics/ViewWeightliftingMetrics.jsx';

function WeightLiftingMetrics() {
    const [editingData, setEditingData] = useState(false);

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }

    return (
        <Stack alignItems={"center"}>
            <ViewWeightliftingMetrics/>
            {!editingData ? (
                <></>
            ) : (
                <Stack width="82%">
                    <InputWeightliftingExercise/>
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

export default WeightLiftingMetrics