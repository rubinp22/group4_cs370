import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import axios from 'axios';

function InputHikingExercise() {
    const theme = useTheme();

    const [distanceIn, setDistanceIn] = useState(undefined);
    const [elevationGainIn, setElevationGainIn] = useState(undefined);
    const [elevationLossIn, setElevationLossIn] = useState(undefined);
    const [durationIn, setDurationIn] = useState(undefined);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);
    const [bodyWeightIn, setBodyWeightIn] = useState(undefined);
    const [fitnessLevelIn, setFitnessLevelIn] = useState(undefined);

    const [errors, setErrors] = useState({
        distance: false,
        elevationGain: false,
        elevationLoss: false,
        duration: false,
        avgHeartRate: false,
        maxHeartRate: false,
        bodyWeight: false,
        fitnessLevel: false
    })

    const textInputSpacing = 3;

    // Won't be a part of the database integration. Don't want users to clear their data with one click
    function handleReset() {
        //setHikingData([])
    }

    function handleClear() {
        setDistanceIn("");
        setElevationGainIn("");
        setElevationLossIn("");
        setDurationIn("");
        setAvgHeartRateIn("");
        setMaxHeartRateIn("");
        setBodyWeightIn("");
        setFitnessLevelIn("");
    }

    function handleSubmit() {
        if (!isError()) {
            setHikingData(prevData => [
                ...prevData,
                {
                    distance: distanceIn,
                    elevationGain: elevationGainIn,
                    elevationLoss: elevationLossIn,
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
            distance: (distanceIn === undefined || distanceIn < 1),
            elevationGain: (elevationGainIn === undefined || elevationGainIn < 1),
            elevationLoss: (elevationLossIn === undefined || elevationLossIn < 1),
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
                <Typography marginBottom={5} fontSize={36}>Input Hiking Metrics</Typography>
                <Stack direction="column" spacing={textInputSpacing}>
                    <TextField 
                        required
                        variant="filled" 
                        label="Distance"
                        type="number"
                        error={errors.distance}
                        value={distanceIn}
                        onChange={(e) => setDistanceIn(e.target.value)}
                        InputProps={{ 
                            endAdornment: <InputAdornment position='end'>Miles</InputAdornment>
                            }}
                    />
                    <TextField 
                        required
                        variant="filled" 
                        label="Elevation Gain"
                        type="number"
                        error={errors.elevationGain}
                        value={elevationGainIn}
                        onChange={(e) => setElevationGainIn(e.target.value)}
                        InputProps={{ 
                            endAdornment: <InputAdornment position='end'>Feet</InputAdornment>
                            }}
                    />
                    <TextField 
                        required
                        variant="filled" 
                        label="Elevation Loss"
                        type="number"
                        error={errors.elevationLoss}
                        value={elevationLossIn}
                        onChange={(e) => setElevationLossIn(e.target.value)}
                        InputProps={{ 
                            endAdornment: <InputAdornment position='end'>Feet</InputAdornment>
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
                        onChange={(e) => setBodyWeightIn(e.target.value)}
                        error={errors.bodyWeight}
                        value={bodyWeightIn}
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

export default InputHikingExercise;