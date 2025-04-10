import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';

function InputWeightliftingExercise() {
    const [repsIn, setRepsIn] = useState(undefined);
    const [setsIn, setSetsIn] = useState(undefined);
    const [weightOfWeightsIn, setWeightOfWeightsIn] = useState(undefined);
    const [durationIn, setDurationIn] = useState(undefined);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);

    // Global State
    const { state, dispatch } = useContext(GlobalStateContext)

    const [errors, setErrors] = useState({
        reps: false,
        sets: false,
        weightOfWeights: false,
        duration: false,
        avgHeartRate: false,
        maxHeartRate: false,
    })

    const textInputSpacing = 3;

    function handleClear() {
        setRepsIn("");
        setSetsIn("");
        setWeightOfWeightsIn("");
        setDurationIn("");
        setAvgHeartRateIn("");
        setMaxHeartRateIn("");
    }

    async function handleSubmit() {
        if (!isError()) {

            const newExercise = {
                userID: state.user,
                // Types: run, hike, cycle, swim, weights
                type: "weights",
                reps: repsIn,
                sets: setsIn,
                weightOfWeights: weightOfWeightsIn,
                duration: durationIn,
                avgHeartRate: avgHeartRateIn,
                maxHeartRate: maxHeartRateIn,
                bodyWeight: state.bodyWeight,
                fitnessLevel: state.fitnessLevel           
            }

            await axios.post('http://localhost:3000/exercises/', newExercise, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }

    function isError() {
        let newErrors = {
            reps: (repsIn === undefined || repsIn < 1),
            sets: (setsIn === undefined || setsIn < 1),
            weightOfWeights: (weightOfWeightsIn === undefined || weightOfWeightsIn < 1),
            duration: (durationIn === undefined || durationIn < 0),
            avgHeartRate: (avgHeartRateIn === undefined || avgHeartRateIn < 1),
            maxHeartRate: (maxHeartRateIn === undefined || maxHeartRateIn < 1),
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
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
            </Stack>
            
        </Card>
    );
}

export default InputWeightliftingExercise;