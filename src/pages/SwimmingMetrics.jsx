import { Link } from 'react-router-dom';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

import MyBarChart from '../components/MyBarChart.jsx';
import MyLapBarChart from '../components/MyLapBarChart.jsx';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

function SwimmingMetrics() {
const [editingData, setEditingData] = useState(false);

const [lapCountIn, setLapCountIn] = useState(undefined);
const [lapTimesIn, setLapTimesIn] = useState([]);
const [strokeCountIn, setStrokeCountIn] = useState([]);
const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);
const [bodyWeightIn, setBodyWeightIn] = useState(undefined);
const [fitnessLevelIn, setFitnessLevelIn] = useState(undefined);

const [swimmingData, setSwimmingData] = useState([]);

const theme = useTheme();

const [errors, setErrors] = useState({
    lapCount: false,
    lapTime: false,
    strokeCount: false,
    avgHeartRate: false,
    maxHeartRate: false,
    bodyWeight: false,
    fitnessLevel: false
})

const lapCount = swimmingData.map(data => data.lapCount);
const lapTimes = swimmingData.map(data => data.lapTimes);
const strokeCount = swimmingData.map(data => data.strokeCount);
const avgHeartRate = swimmingData.map(data => data.avgHeartRate);
const maxHeartRate = swimmingData.map(data => data.maxHeartRate);
const bodyWeight = swimmingData.map(data => data.bodyWeight);
const fitnessLevel = swimmingData.map(data => data.fitnessLevel);

// Finding the duration (in minutes) of each swim by totaling each lap for each swim
// Dividing my 60 because lap times are stored in seconds
const duration = lapTimes.map(data => {
    return (data.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
    ) / 60)
})

// Finding the strokes per swim by totaling the strokes for each lap per swim
const strokesPerSwim = strokeCount.map(data => {
    return (data.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
    ))
})


// Finding the strokes per minute
// strokeRate = strokesPerSwim / minutes per swim
const strokeRate = strokesPerSwim.map((data, index) => data / duration[index]);


// This accounts for whether one swim session has a different lap count than another swim session
// Maybe you swam 5 laps for your past two swims, but your most recent swim had 7 laps.
// That session is the one we will want to map over when we transpose the array (invert the axes)
let highestLaps = 0;
let longestLapIdx = 0;
lapTimes.map((data, index) => {
    if (data.length > highestLaps) {
        highestLaps = data.length;
        longestLapIdx = index;
    }
})

// Transpose the array. Ex: a 5 x 3 array would become a 3 x 5. Useful for stacking the data using MUI X
let transposed = [];
if (lapTimes.length > 0) {
    transposed = lapTimes[longestLapIdx].map((data, colIndex) => lapTimes.map(row => row[colIndex]));
}


// Creating an array of objects with "data" and "label", this is the format MUI X Charts accepts
const result = transposed.map((data, index) => ({
    data: data,
    label: `lap ${index + 1}`
}));

// Distance = lapCount * poolLength
// Olympic/competitive pool sizes are heavily regulated at a standard 50 meters long
const distance = lapCount.map(data => data * 50);

const heartRateReserve = avgHeartRate.map((data, index) => 
    Math.abs((data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]])));

const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))

const caloriesBurned = MET.map((data, index) => parseInt(data * (duration[index] / 60) * bodyWeight[index]));

const labels = swimmingData.map((_, index) => `swim ${index + 1}`)
const graphMargin = 3;
const textInputSpacing = 3;

function handleEdit() {
    editingData ? setEditingData(false) : setEditingData(true)
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

function handleSubmit() {
    if (!isError()) {
        setSwimmingData(prevData => [
            ...prevData,
            {
                lapCount: lapCountIn,
                lapTimes: lapTimesIn,
                strokeCount: strokeCountIn,
                avgHeartRate: avgHeartRateIn,
                maxHeartRate: maxHeartRateIn,
                bodyWeight: bodyWeightIn,
                fitnessLevel: fitnessLevelIn
            }
        ])
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

function handleReset() {
    setSwimmingData([])
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
        <Stack>
            {/* <img src="/images/fitness_app_swimmer.jpg" alt="A Person is swimming laps" /> */}
            <Typography fontSize={32}>SWIMMING METRICS</Typography>
            <Stack>
                <Stack direction="row">
                    <Card sx={{ margin: graphMargin }}>
                        <MyBarChart 
                            labels={ labels } 
                            dataSets={[ distance ]} 
                            seriesLabel={[ "Distance Swam (meters)" ]}
                            colors={[ theme.palette.secondary.main ]}
                        />    
                    </Card>
                    <Card sx={{ margin: graphMargin }}>
                        <MyBarChart 
                            labels={ labels } 
                            dataSets={[ duration ]} 
                            seriesLabel={[ "Time per Swim (minutes)" ]}
                            colors={[ theme.palette.secondary.main ]}
                        /> 
                    </Card>
                </Stack>
                <Stack direction="row">
                    <Card sx={{ margin: graphMargin }}>
                        {/* <BarChart
                             xAxis={[{ scaleType: "band", data: labels }]}
                            series={result.map(item => ({...item, stack: 'total'}))}
                            width={500}
                            height={300}
                        /> */}
                        <MyLapBarChart 
                            labels={ labels } 
                            dataSets={[ result ]} 
                            seriesLabel={[ "Strokes per minutes" ]}
                            colors={[ theme.palette.secondary.main ]}
                        /> 
                    </Card>
                    <Card sx={{ margin: graphMargin }}>
                        <MyBarChart 
                            labels={ labels } 
                            dataSets={[ strokeRate ]} 
                            seriesLabel={[ "Strokes per minutes" ]}
                            colors={[ theme.palette.secondary.main ]}
                        /> 
                    </Card>
                </Stack>
                <Stack direction="row">
                    <Card sx={{ margin: graphMargin }}>
                        <MyBarChart 
                            labels={ labels } 
                            dataSets={[ avgHeartRate, maxHeartRate ]} 
                            seriesLabel={[ "Avg Heart Rate", "Max Heart Rate" ]}
                            colors={[ theme.palette.secondary.main, theme.palette.secondary.dark ]}
                        />
                    </Card>
                    <Card sx={{ margin: graphMargin }}>
                        <MyBarChart 
                            labels={ labels } 
                            dataSets={[ caloriesBurned ]} 
                            seriesLabel={[ "Estimated Calories Burned" ]}
                            colors={[ theme.palette.secondary.main ]}
                        />
                    </Card>
                </Stack>
                {!editingData ? (
                    <></>
                ) : (
                    <Card sx={{ padding:"40px" }}>
                    <Typography marginBottom={5} fontSize={24}>Input Swimming Metrics</Typography>
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
                        {/* Create N number of these text fields depending on the value of lapCount */}
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
                                    endAdornment: <InputAdornment position='end'>Seconds</InputAdornment>
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
                )}
            </Stack>
            <Stack direction="row" marginTop={5} spacing={5} justifyContent="center">
                <Button variant="contained" 
                    onClick={handleEdit}
                >
                    {editingData ? "Stop Editing" : "Edit Data"}
                </Button>
                <Link to="../fitnessTypes" className="button-link">Back to Fitness Types</Link>
            </Stack>
        </Stack>
    );

}

export default SwimmingMetrics