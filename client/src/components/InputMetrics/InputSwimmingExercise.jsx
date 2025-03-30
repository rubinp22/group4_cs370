import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import axios from 'axios';

function InputSwimmingExercise() {
    // Will be replaced once DB/API is integrated
    const [swimmingData, setSwimmingData] = useState([]);

    const theme = useTheme();

    const [lapCountIn, setLapCountIn] = useState(undefined);
    const [lapTimesIn, setLapTimesIn] = useState([]);
    const [strokeCountIn, setStrokeCountIn] = useState([]);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);
    const [bodyWeightIn, setBodyWeightIn] = useState(undefined);
    const [fitnessLevelIn, setFitnessLevelIn] = useState(undefined);

    const [errors, setErrors] = useState({
        lapCount: false,
        lapTime: false,
        strokeCount: false,
        avgHeartRate: false,
        maxHeartRate: false,
        bodyWeight: false,
        fitnessLevel: false
    })

    const textInputSpacing = 3;

    // Won't be a part of the database integration. Don't want users to clear their data with one click
    function handleReset() {
        //setSwimmingData([])
    }

    function handleClear() {
        setLapCountIn("");
        setLapTimesIn([]);
        setStrokeCountIn([]);
        setAvgHeartRateIn("");
        setMaxHeartRateIn("");
        setBodyWeightIn("");
        setFitnessLevelIn("");
    }
    
    async function handleSubmit() {
        if (!isError()) {
            // setSwimmingData(prevData => [
            //     ...prevData,
            //     {
            //         lapCount: lapCountIn,
            //         lapTimes: lapTimesIn,
            //         strokeCount: strokeCountIn,
            //         avgHeartRate: avgHeartRateIn,
            //         maxHeartRate: maxHeartRateIn,
            //         bodyWeight: bodyWeightIn,
            //         fitnessLevel: fitnessLevelIn
            //     }
            // ])

            const newExercise = {
                type: "swim",
                lapCount: lapCountIn,
                lapTimes: lapTimesIn,
                strokeCount: strokeCountIn,
                avgHeartRate: avgHeartRateIn,
                maxHeartRate: maxHeartRateIn,
                bodyWeight: bodyWeightIn,
                fitnessLevel: fitnessLevelIn
            }

            console.log("about to add new exercise: ", newExercise);

            await axios.post('http://localhost:3000/exercises/', newExercise, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
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
                <TextField
                    required
                    variant="filled"
                    label="Bodyweight"
                    type="number"
                    error={errors.bodyWeight}
                    value={bodyWeightIn}
                    onChange={(e) => setBodyWeightIn(e.target.value)}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">Kg</InputAdornment>
                    ),
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
                    endAdornment: (
                        <InputAdornment position="end">(0 - 2)</InputAdornment>
                    ),
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

export default InputSwimmingExercise;