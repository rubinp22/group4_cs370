
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import MyBarChart from '../components/MyBarChart.jsx';
import axios from 'axios';
import ViewRunningMetrics from '../components/ViewMetrics/ViewRunningMetrics.jsx';
import InputRunningExercise from '../components/InputMetrics/InputRunningExercise.jsx';

function RunningMetrics() {
    const [editingData, setEditingData] = useState(false);

    const theme = useTheme();

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }

    return (
        <Stack alignItems={"center"}>
            <ViewRunningMetrics/>
            <Stack width="82%">
                {!editingData ? (
                    <></>
                ) : (
                <InputRunningExercise/>
                )}
            </Stack>
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

export default RunningMetrics
