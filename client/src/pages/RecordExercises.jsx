import { Stack, Card, Typography, TextField } from '@mui/material';
import { useState } from 'react';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';


import InputRunningExercise from '../components/InputMetrics/InputRunningExercise';
import InputHikingExercise from '../components/InputMetrics/InputHikingExercise';
import InputCyclingExercise from '../components/InputMetrics/InputCyclingExercise';
import InputSwimmingExercise from '../components/InputMetrics/InputSwimmingExercise';
import InputWeightliftingExercise from '../components/InputMetrics/InputWeightliftingExercise';

function RecordExercises() {
    const exercises = ["Running", "Hiking", "Cycling", "Swimming", "Weightlifting"];

    const components = {
        Running: InputRunningExercise,
        Hiking: InputHikingExercise,
        Cycling: InputCyclingExercise,
        Swimming: InputSwimmingExercise,
        Weightlifting: InputWeightliftingExercise
    }
    const [exerciseType, setExerciseType] = useState(undefined);
    const SelectedComponent = components[exerciseType];

    console.log(SelectedComponent)

    return (
            <Stack alignItems={"center"}>
                <Card sx={{ width: "100%", p:2}}>
                    <Typography fontSize={36} padding={2} marginLeft={3} marginRight={3}>Record an Exercise</Typography>
                    <TextField
                        fullWidth
                        required
                        variant="filled"
                        select
                        label="Select an Exercise"
                        onChange={(e) => setExerciseType(e.target.value)}
                    >
                        {exercises.map((option, idx) => (
                            <MenuItem key={idx + option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Card>

                <Stack padding={2}>
                    {SelectedComponent && <SelectedComponent />}
                </Stack>

                <Stack direction="row" marginTop={5} spacing={5} justifyContent="center">
                    <MuiLink to="../" component={RouterLink} className="button-link">Back to Home</MuiLink>
                </Stack>
            </Stack>

    );
}

export default RecordExercises;