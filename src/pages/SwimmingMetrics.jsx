import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

const swimmingData = [
    {
        lapCount: 5,                        // number of pool lengths completed, so 50 meters * lapCount = distance
        lapTimes: [74, 76, 78, 73, 80],     // can be used to find best lap time, 
        strokeCount: [55, 57, 57, 54, 60],  // per lap. Indicates skill, form, and experience
        avgHeartRate: 120,
        maxHeartRate: 130,
        bodyWeight: 70,                     // in Kg
        fitnessLevel: 0,
    },
    {
        lapCount: 5,                        
        lapTimes: [69, 71, 73, 68, 75],     
        strokeCount: [48, 50, 50, 47, 53],  
        avgHeartRate: 120,
        maxHeartRate: 130,
        bodyWeight: 70,                     
        fitnessLevel: 0,
    },
    {
        lapCount: 7,                        
        lapTimes: [54, 57, 58, 53, 61, 55, 54],     
        strokeCount: [41, 43, 43, 40, 46, 42, 40],  
        avgHeartRate: 120,
        maxHeartRate: 130,
        bodyWeight: 70,                     
        fitnessLevel: 0,
    },
    {
        lapCount: 7,                        
        lapTimes: [41, 39, 45, 43, 48, 43, 42],     
        strokeCount: [35, 37, 37, 34, 40, 36, 34],  
        avgHeartRate: 110,
        maxHeartRate: 120,
        bodyWeight: 70,                     
        fitnessLevel: 1,
    },
    {
        lapCount: 10,                        
        lapTimes: [34, 37, 37, 33, 41, 36, 34, 31, 33, 36],     
        strokeCount: [45, 47, 47, 44, 40, 45, 42, 44, 45],  
        avgHeartRate: 110,
        maxHeartRate: 125,
        bodyWeight: 70,                     
        fitnessLevel: 2,
    }
]

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
    ) / 60 )
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
const transposed = lapTimes[longestLapIdx].map((data, colIndex) => lapTimes.map(row => row[colIndex]));


// Creating an array of objects with "data" and "label", this is the format MUI X Charts accepts
const result = transposed.map((data, index) => ({
    data: data,
    label: `lap ${index + 1}`
}));

// Distance = lapCount * poolLength
// Olympic/competitive pool sizes are heavily regulated at a standard 50 meters long
const distance = lapCount.map(data => data * 50);

const heartRateReserve = avgHeartRate.map((data, index) => 
    (data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]]));

const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))

const caloriesBurned = MET.map((data, index) => parseInt(data * (duration[index] / 60) * bodyWeight[index]));

const labels = swimmingData.map((data, index) => `swim ${index + 1}`)
const graphMargin = 3;

function SwimmingMetrics() {
    const navigate = useNavigate();

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
            </Stack>
            <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
        </Stack>
    );

}

export default SwimmingMetrics