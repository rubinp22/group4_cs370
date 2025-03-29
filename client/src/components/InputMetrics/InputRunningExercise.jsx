import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import axios from 'axios';

function InputRunningExercise() {
    const theme = useTheme();

    const [distanceIn, setDistanceIn] = useState(undefined);
    const [durationIn, setDurationIn] = useState(undefined);
    const [stepsIn, setStepsIn] = useState(undefined);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);
    const [bodyWeightIn, setBodyWeightIn] = useState(undefined);
    const [fitnessLevelIn, setFitnessLevelIn] = useState(undefined);

    // This new state is accessed by the error attribute for each Textfield
    const [errors, setErrors] = useState({
        distance: false,
        duration: false,
        steps: false,
        avgHeartRate: false,
        maxHeartRate: false,
        bodyWeight: false,
        fitnessLevel: false
    })

        const textInputSpacing = 3;
    
        // Won't be a part of the database integration. Don't want users to clear their data with one click
        function handleReset() {
            //setRunningData([])
        }
    
        function handleClear() {
            setDistanceIn("");
            setDurationIn("");
            setStepsIn("");
            setAvgHeartRateIn("");
            setMaxHeartRateIn("");
            setBodyWeightIn("");
            setFitnessLevelIn("");
        }
    
        async function handleSubmit() {
            if (!isError()) {
    
                const newExercise = {
                    distance: distanceIn,
                    duration: durationIn,
                    steps: stepsIn,
                    avgHeartRate: avgHeartRateIn,
                    maxHeartRate: maxHeartRateIn,
                    bodyWeight: bodyWeightIn,
                    fitnessLevel: fitnessLevelIn
                }
    
                console.log("about to add new exercise: ", newExercise);
    
                // Incrementing fetchCount to cause the useEffect hook that fetches data with Hono to run again
                setFetchCount(prev => prev + 1);
    
                // Add the game via the POST route on the api
                await axios.post('http://localhost:3000/exercises/running-entry', newExercise, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }
    
        // Checking if text field input is either undefined, less than 1, or greater than the specified range
        // If an error is found, this function returns true, preventing handleSubmit from storing the erroneous data
        // in state.
        function isError() {
            // Making a new object with values equal to whether or not the input state meets certain conditions
            // Will result in an object that holds Boolean values
    
            let newErrors = {
                distance: (distanceIn === undefined || distanceIn < 0),
                duration: (durationIn === undefined || durationIn < 0),
                steps: (stepsIn === undefined || stepsIn < 1),
                avgHeartRate: (avgHeartRateIn === undefined || avgHeartRateIn < 1),
                maxHeartRate: (maxHeartRateIn === undefined || maxHeartRateIn < 1),
                bodyWeight: (bodyWeightIn === undefined || bodyWeightIn < 1),
                fitnessLevel: (fitnessLevelIn === undefined || fitnessLevelIn < 0 || fitnessLevelIn > 2),
    
            }
    
            // Since we now have state for errors, we set it equal to the the values found within the object newErrors
            // If any of the above conditions are true, the corresponding text field will enter an error state, indicating
            // to the user that they entered erroneous input
            // Metric Input
            setErrors(newErrors);
    
            // Converting the newErrors object to a Boolean array of just the values from the newErrors object
            // Metric Input
            let newErrorsArray = Object.values(newErrors)
            let errorFound = false;
    
            // Loop through the new Boolean array, setting errorFound to true if any values are true
            // Metric Input
            newErrorsArray.forEach(val => {
                if (val === true) {
                    errorFound = true;
                }
            })
    
            return errorFound;
        }

    return (
        <Card sx={{ padding:"40px" }}>
            <Typography marginBottom={5} fontSize={36}>Input Running Metrics</Typography>
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
                    label="Steps"
                    type="number"
                    value={stepsIn}
                    error={errors.steps}
                    onChange={(e) => setStepsIn(e.target.value)}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Average Heart Rate"
                    type="number"
                    value={avgHeartRateIn}
                    error={errors.avgHeartRate}
                    onChange={(e) => setAvgHeartRateIn(e.target.value)}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Maximum Heart Rate"
                    type="number"
                    value={maxHeartRateIn}
                    error={errors.maxHeartRate}
                    onChange={(e) => setMaxHeartRateIn(e.target.value)}
                />
                <TextField 
                    required 
                    variant="filled" 
                    label="Bodyweight"
                    type="number"
                    value={bodyWeightIn}
                    error={errors.bodyWeight}
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
                    value={fitnessLevelIn}
                    error={errors.fitnessLevel}
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

export default InputRunningExercise;