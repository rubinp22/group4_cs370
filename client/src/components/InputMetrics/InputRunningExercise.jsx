import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';

function InputRunningExercise() {
    const [distanceIn, setDistanceIn] = useState(undefined);
    const [durationIn, setDurationIn] = useState(undefined);
    const [stepsIn, setStepsIn] = useState(undefined);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);

    // Global State
    const { state, dispatch } = useContext(GlobalStateContext)

    // This new state is accessed by the error attribute for each Textfield
    const [errors, setErrors] = useState({
        distance: false,
        duration: false,
        steps: false,
        avgHeartRate: false,
        maxHeartRate: false,
    })

        const textInputSpacing = 3;
    
        function handleClear() {
            setDistanceIn("");
            setDurationIn("");
            setStepsIn("");
            setAvgHeartRateIn("");
            setMaxHeartRateIn("");
        }

        async function getNewExerciseID() {
            try {
                const res = await axios.get('http://localhost:3000/exercises', {
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    params: {
                        userID: state.user
                    }
                });
                // Getting the most recent exercise Object ID recorded by the user and returning it
                const exerciseID = res.data.at(-1)._id;
                return exerciseID;
            } catch (error) {
                console.error('Error Fetching user exercises');
            }
        }
    
        async function handleSubmit() {
            if (!isError()) {
    
                const newExercise = {
                    // Now we are passing the userID found in global state (state.user)
                    userID: state.user,
                    // Types: run, hike, cycle, swim, weights
                    type: "run",
                    distance: distanceIn,
                    duration: durationIn,
                    steps: stepsIn,
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

                // await (from axios) needs to be called here because getNewExerciseID() returns an ID that
                // results from an API call. Without await, it will only return a promise. We need that
                // promise to first be fulfilled.
                const newExerciseID = await getNewExerciseID();

                const updatedData = {
                    _id: state.user,
                    // Appending the new exerciseID into user.exercises using our global state's data
                    // with the spread operator (...). This is because we are pushing a new value onto
                    // the array, not overwriting it. 
                    exercises: [...state.exercises, newExerciseID]
                }
                await axios.put('http://localhost:3000/users/', updatedData)

                // Updating our global state with the newly-appended exercise ID
                // This way submitting more than one exercise on the same page correctly appends
                // and doesn't just update the last exercise ID in the array.
                dispatch({ type: 'SETEXERCISES', payload: updatedData.exercises });

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
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
            </Stack>
        </Card>
    );
}

export default InputRunningExercise;