import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import axios from 'axios';

function InputWeightliftingExercise() {
    // Will be replaced once DB/API is integrated
    const [weightLiftData, setWeightLiftData ] = useState([]);

    const theme = useTheme();

    const [repsIn, setRepsIn] = useState(undefined);
    const [setsIn, setSetsIn] = useState(undefined);
    const [weightOfWeightsIn, setWeightOfWeightsIn] = useState(undefined);
    const [durationIn, setDurationIn] = useState(undefined);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);
    const [bodyWeightIn, setBodyWeightIn] = useState(undefined);
    const [fitnessLevelIn, setFitnessLevelIn] = useState(undefined);

    const [errors, setErrors] = useState({
        reps: false,
        sets: false,
        weightOfWeights: false,
        duration: false,
        avgHeartRate: false,
        maxHeartRate: false,
        bodyWeight: false,
        fitnessLevel: false
    })

    const textInputSpacing = 3;

    // Won't be a part of the database integration. Don't want users to clear their data with one click
    function handleReset() {
        //setWeightLiftData([])
    }

    function handleClear() {
        setRepsIn("");
        setSetsIn("");
        setWeightOfWeightsIn("");
        setDurationIn("");
        setAvgHeartRateIn("");
        setMaxHeartRateIn("");
        setBodyWeightIn("");
        setFitnessLevelIn("");
    }

    function handleSubmit() {
        if (!isError()) {
            setWeightLiftData(prevData => [
                ...prevData,
                {
                    reps: repsIn,
                    sets: setsIn,
                    weightOfWeights: weightOfWeightsIn,
                    duration: durationIn,
                    avgHeartRate: avgHeartRateIn,
                    maxHeartRate: maxHeartRateIn,
                    bodyWeight: bodyWeightIn,
                    fitnessLevel: fitnessLevelIn
                }
            ])
        }
    }

    function isError() {
        let newErrors = {
            reps: (repsIn === undefined || repsIn < 1),
            sets: (setsIn === undefined || setsIn < 1),
            weightOfWeights: (weightOfWeightsIn === undefined || weightOfWeightsIn < 1),
            duration: (durationIn === undefined || durationIn < 1),
            avgHeartRate: (avgHeartRateIn === undefined || avgHeartRateIn < 1),
            maxHeartRate: (maxHeartRateIn === undefined || maxHeartRateIn < 1),
            bodyWeight: (bodyWeightIn === undefined || bodyWeightIn < 1),
            fitnessLevel: (fitnessLevelIn === undefined || fitnessLevelIn < 0 || fitnessLevelIn > 2),

        }

        setErrors(newErrors);

        let newErrorsArray = Object.values(newErrors)
        let errorFound = false;

        newErrorsArray.forEach(val => {
            if (val === true) {
                errorFound = true;
            }
        })

        return errorFound;
    }

    return (
        <Card sx={{ padding:"40px" }}>
            <Typography marginBottom={5} fontSize={36}>Input Weightlifting Metrics</Typography>
            <Stack direction="column" spacing={textInputSpacing}>
                <TextField 
                    required
                    variant="filled" 
                    label="Reps"
                    type="number"
                    error={errors.reps}
                    value={repsIn}
                    onChange={(e) => setRepsIn(e.target.value)}
                />
                <TextField 
                    required
                    variant="filled" 
                    label="Sets"
                    type="number"
                    error={errors.sets}
                    value={setsIn}
                    onChange={(e) => setSetsIn(e.target.value)}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Weight of Weights"
                    type="number"
                    error={errors.weightOfWeights}
                    value={weightOfWeightsIn}
                    onChange={(e) => setWeightOfWeightsIn(e.target.value)}
                    InputProps={{ 
                        endAdornment: <InputAdornment position='end'>Kg</InputAdornment>
                        }}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Duration"
                    type="number"
                    error={errors.duration}
                    value={durationIn}
                    onChange={(e) => setDurationIn(e.target.value)}
                    InputProps={{ 
                        endAdornment: <InputAdornment position='end'>Hours</InputAdornment>
                        }}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Average Heart Rate"
                    type="number"
                    error={errors.avgHeartRate}
                    value={avgHeartRateIn}
                    onChange={(e) => setAvgHeartRateIn(e.target.value)}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Maximum Heart Rate"
                    type="number"
                    error={errors.maxHeartRate}
                    value={maxHeartRateIn}
                    onChange={(e) => setMaxHeartRateIn(e.target.value)}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Bodyweight"
                    type="number"
                    error={errors.bodyWeight}
                    value={bodyWeightIn}
                    onChange={(e) => setBodyWeightIn(e.target.value)}
                    InputProps={{ 
                        endAdornment: <InputAdornment position='end'>Kg</InputAdornment>
                        }}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Fitness Level"
                    type="number"
                    error={errors.fitnessLevel}
                    value={fitnessLevelIn}
                    onChange={(e) => setFitnessLevelIn(e.target.value)}
                    InputProps={{ 
                        endAdornment: <InputAdornment position='end'>(0 - 2)</InputAdornment>
                        }}
                />
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                <Button variant="contained" color="error" onClick={handleReset}>Reset Data</Button>
            </Stack>
            
        </Card>
    );
}

export default InputWeightliftingExercise;