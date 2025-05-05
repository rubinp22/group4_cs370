import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';

function InputSwimmingExercise() {
    const [lapCountIn, setLapCountIn] = useState(undefined);
    const [lapTimesIn, setLapTimesIn] = useState([]);
    const [strokeCountIn, setStrokeCountIn] = useState([]);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);
    const [exerciseSubmitted, setExerciseSubmitted] = useState(false);


    // Global State
    const { state, dispatch } = useContext(GlobalStateContext)

    const [errors, setErrors] = useState({
        lapCount: false,
        lapTime: false,
        strokeCount: false,
        avgHeartRate: false,
        maxHeartRate: false,
    })

    const textInputSpacing = 3;

    function handleClear() {
        setLapCountIn("");
        setLapTimesIn([]);
        setStrokeCountIn([]);
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
            const exerciseID = res.data.at(-1)._id;
            return exerciseID;
        } catch (error) {
            console.error('Error Fetching user exercises');
        }
    }
    
    async function handleSubmit() {
        if (!isError()) {

            const newExercise = {
                userID: state.user,
                // Types: run, hike, cycle, swim, weights
                type: "swim",
                lapCount: lapCountIn,
                lapTimes: lapTimesIn,
                strokeCount: strokeCountIn,
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

            const newExerciseID = await getNewExerciseID();

            const updatedData = {
                _id: state.user,
                exercises: [...state.exercises, newExerciseID]
            }
            await axios.put('http://localhost:3000/users/', updatedData)

            dispatch({ type: 'SETEXERCISES', payload: updatedData.exercises });

            setExerciseSubmitted(true);
        }
    }
    
    // This function was the first time I used the some method, so I'm going to document it for my sake.
    // The some() method of Array instances tests whether at least one element in the array
    // passes the test implemented by the provided function. It returns true if, in the array,
    // it finds an element for which the provided function returns true; otherwise it returns
    // false. It doesn't modify the array. 
    function isError() {
        let newErrors = {
            lapCount: (lapCountIn === undefined || lapCountIn < 1),
            lapTime: lapTimesIn.some(val => val === undefined || val < 1),
            strokeCount: strokeCountIn.some(val => val === undefined || val < 1),
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

    function handleLapCountChange(laps) {
        const count = parseInt(laps);
        setLapCountIn(count);
        // When you input a value for the lap count, arrays for lap times and stroke count are created
        // They are filled with empty strings based on the value of count
        // This allows us to map over these empty arrays, creating text fields for each element
        // Example:
        // If lapTimesIn = ["", "", ""]
        // Then three text fields are created to input into.
        setLapTimesIn(new Array(count).fill(""));
        setStrokeCountIn(new Array(count).fill(""));
    }

    function handleResubmission() {
        handleClear();
        setExerciseSubmitted(false);
    }

    return (
        <Card sx={{ padding: "40px" }}>
            <Typography marginBottom={5} fontSize={36}>Input Swimming Metrics</Typography>
            <Stack direction="column" spacing={textInputSpacing}>
                <TextField
                    required
                    variant="filled"
                    label="Lap Count"
                    type="number"
                    error={errors.lapCount}
                    value={lapCountIn}
                    onChange={(e) => handleLapCountChange(e.target.value)}
                />
                {lapTimesIn.map((_, index) => (
                    <TextField
                    key={index}
                    required
                    variant="filled"
                    label={`Lap Time ${index + 1}`}
                    type="number"
                    error={errors.lapTime}
                    value={lapTimesIn[index]}
                    onChange={(e) => {
                        const updatedLapTimes = [...lapTimesIn];
                        updatedLapTimes[index] = parseInt(e.target.value);
                        setLapTimesIn(updatedLapTimes);
                    }}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">Seconds</InputAdornment>
                        ),
                    }}
                    />
                ))}
                {strokeCountIn.map((_, index) => (
                    <TextField
                    key={index}
                    required
                    variant="filled"
                    label={`Lap ${index + 1} Stroke Count`}
                    type="number"
                    error={errors.strokeCount}
                    value={strokeCountIn[index]}
                    onChange={(e) => {
                        const updatedStrokeCounts = [...strokeCountIn];
                        updatedStrokeCounts[index] = parseInt(e.target.value);
                        setStrokeCountIn(updatedStrokeCounts);
                    }}
                    />
                ))}
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

            <Stack direction="row" justifyContent="center" alignItems="center" spacing={5} marginTop={5}>
                {exerciseSubmitted ? (
                        <>
                            <Button variant="contained" onClick={handleResubmission}>Submit Another?</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                            <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                        </>
                    )
                }
            </Stack>

        </Card>
    );


}

export default InputSwimmingExercise;