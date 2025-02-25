import { Link } from 'react-router-dom';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useState } from 'react';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

function SwimmingMetrics() {
const [editingData, setEditingData] = useState(false);

const [lapCountIn, setLapCountIn] = useState(0);
const [lapTimesIn, setLapTimesIn] = useState([]);
const [strokeCountIn, setStrokeCountIn] = useState([]);
const [avgHeartRateIn, setAvgHeartRateIn] = useState(0);
const [maxHeartRateIn, setMaxHeartRateIn] = useState(0);
const [bodyWeightIn, setBodyWeightIn] = useState(0);
const [fitnessLevelIn, setFitnessLevelIn] = useState(0);

const [swimmingData, setSwimmingData] = useState([]);

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

function handleSubmit() {
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
            <Typography fontSize={32}>SWIMMING METRICS</Typography>
            <Stack>
                <Stack direction="row">
                    <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                        <BarChart
                            xAxis={[{ scaleType: "band", data: labels }]}
                            series={[{ data: distance, label: "Distance Swam (meters)" }]}
                            width={500}
                            height={300}
                        />
                    </Card>
                    <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                        <BarChart
                            xAxis={[{ scaleType: "band", data: labels }]}
                            series={[{ data: duration, label: "Time per Swim (minutes)" }]}
                            width={500}
                            height={300}
                        />
                    </Card>
                </Stack>
                <Stack direction="row">
                    <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                        <BarChart
                             xAxis={[{ scaleType: "band", data: labels }]}
                            series={result.map(item => ({...item, stack: 'total'}))}
                            width={500}
                            height={300}
                        />
                    </Card>
                        <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                            <BarChart
                                xAxis={[{ scaleType: "band", data: labels }]}
                                series={[{ data: strokeRate, label: "Strokes per minute" }]}
                                width={500}
                                height={300}
                            />
                        </Card>
                </Stack>
                <Stack direction="row">
                    <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                        <BarChart
                            xAxis={[{ scaleType: "band", data: labels }]}
                            series={[
                                {data: avgHeartRate, label: "Avg Heart Rate" },
                                {data: maxHeartRate, label: "Max Heart Rate" }
                            ]}
                            width={500}
                            height={300}
                        />
                    </Card>
                    <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                        <BarChart
                            xAxis={[{ scaleType: "band", data: labels }]}
                            series={[{ data: caloriesBurned, label: "Estimated Calories Burned" }]}
                            width={500}
                            height={300}
                        />
                    </Card>
                </Stack>
                {!editingData ? (
                    <></>
                ) : (
                    <Card sx={{ padding:"40px", backgroundColor:"#828c85"}}>
                    <Typography marginBottom={5} fontSize={24}>Input Swimming Metrics</Typography>
                    <Stack direction="column" spacing={textInputSpacing}>
                        <TextField 
                            required
                            variant="filled" 
                            label="Lap Count"
                            type="number"
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
                            onChange={(e) => setAvgHeartRateIn(e.target.value)}
                        />
                        <TextField 
                            required 
                            variant="filled" 
                            label="Maximum Heart Rate"
                            type="number"
                            onChange={(e) => setMaxHeartRateIn(e.target.value)}
                        />
                        <TextField 
                            required 
                            variant="filled" 
                            label="Bodyweight"
                            type="number"
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
                            onChange={(e) => setFitnessLevelIn(e.target.value)}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>(0 - 2)</InputAdornment>
                                }}
                        />
                    </Stack>

                    <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
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