import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

const runningData = [
    {
        distance: 1.5,      // Distance ran in miles
        duration: 0.25,      // hours
        steps: 2500,
        avgHeartRate: 125,
        maxHeartRate: 145,
        bodyWeight: 70,     // in Kg, equal to 154 lbs
        fitnessLevel: 0
    },
    {
        distance: 2,      
        duration: 0.3,      
        steps: 3200,
        avgHeartRate: 130,
        maxHeartRate: 150,
        bodyWeight: 70,     
        fitnessLevel: 0
    },
    {
        distance: 2.5,      
        duration: 0.35,      
        steps: 4000,
        avgHeartRate: 130,
        maxHeartRate: 155,
        bodyWeight: 70,     
        fitnessLevel: 1
    },
    {
        distance: 4,      
        duration: 0.5,      
        steps: 5500,
        avgHeartRate: 125,
        maxHeartRate: 145,
        bodyWeight: 70,     
        fitnessLevel: 1
    },
    {
        distance: 1.5,      
        duration: 0.5,      
        steps: 4500,
        avgHeartRate: 125,
        maxHeartRate: 145,
        bodyWeight: 70,     
        fitnessLevel: 0
    }
]

const distance = runningData.map(data => data.distance);
const duration = runningData.map(data => data.duration);
const steps = runningData.map(data => data.steps);
const avgHeartRate = runningData.map(data => data.avgHeartRate);
const maxHeartRate = runningData.map(data => data.maxHeartRate);
const bodyWeight = runningData.map(data => data.bodyWeight);
const fitnessLevel = runningData.map(data => data.fitnessLevel);

// speed = distance / duration
const speed = distance.map((data, index) => data / duration[index]);
// pace = duration / distance
// How long does it take to run a mile (or km if we decide to support that unit)
const pace = duration.map((data, index) => data / distance[index]);
// cadence = steps / minutes
// Also known as steps per minute (SPM). Lower cadences (<160 SPM) indicates longer strides, and
// more impact per step. This increases injury risk for beginners, so it is safer and more efficient
// to have a cadence of 170 - 190 SPM
const cadence = steps.map((data, index) => data / (duration[index] * 60));

const heartRateReserve = avgHeartRate.map((data, index) => 
    (data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]]));

const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))

const caloriesBurned = MET.map((data, index) => parseInt(data * duration[index] * bodyWeight[index]));

const labels = runningData.map((data, index) => `run ${index + 1}`)
const graphMargin = 3;

function RunningMetrics() {
    const navigate = useNavigate();
    return (
        <Stack>
            <Typography fontSize={32}>
                Running Metrics
            </Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: distance, label: "Distance Ran (Miles)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: speed, label: "Running Speed (MPH)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: pace, label: "Time per mile (in hours)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: cadence, label: "Cadence (Steps per minute)" }]}
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
            <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
        </Stack>

    );
}

export default RunningMetrics