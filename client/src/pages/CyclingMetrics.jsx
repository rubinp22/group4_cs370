import { Link as RouterLink } from 'react-router-dom';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import MuiLink from '@mui/material/Link';
import { useTheme } from '@emotion/react';

import MyBarChart from '../components/MyBarChart.jsx';

import InputCyclingExercise from '../components/InputMetrics/InputCyclingExercise.jsx';
import ViewCyclingMetrics from '../components/ViewMetrics/ViewCyclingMetrics.jsx';

function CyclingMetrics() {
    const [editingData, setEditingData] = useState(false);

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }
    
    return (
        <Stack alignItems="center">
            <ViewCyclingMetrics/>
            {!editingData ? (
                <></>
            ) : (
                <Stack width="82%">
                    <InputCyclingExercise/>
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

export default CyclingMetrics;