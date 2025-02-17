import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

const cyclingData = [
    {
        distance: 3,            // in miles
        duration: 0.75,         // in hours
        elevationGain: 300,     // in feet
        avgHeartRate: 100,
        maxHeartRate: 120,
        bodyWeight: 70,         // in Kg
        fitnessLevel: 0
    },
    {
        distance: 5,            
        duration: 0.75,         
        elevationGain: 400,     
        avgHeartRate: 105,
        maxHeartRate: 120,
        bodyWeight: 70,         
        fitnessLevel: 0
    },
    {
        distance: 6,            
        duration: 1,         
        elevationGain: 600,     
        avgHeartRate: 115,
        maxHeartRate: 135,
        bodyWeight: 70,         
        fitnessLevel: 0
    },
    {
        distance: 8,            
        duration: 1,         
        elevationGain: 600,     
        avgHeartRate: 105,
        maxHeartRate: 120,
        bodyWeight: 70,         
        fitnessLevel: 1
    },
    {
        distance: 10,            
        duration: 1.25,         
        elevationGain: 700,     
        avgHeartRate: 90,
        maxHeartRate: 110,
        bodyWeight: 70,         
        fitnessLevel: 2
    },
    
    
]

const distance = cyclingData.map(data => data.distance);
const duration = cyclingData.map(data => data.duration);
const elevationGain = cyclingData.map(data => data.elevationGain);
const avgHeartRate = cyclingData.map(data => data.avgHeartRate);
const maxHeartRate = cyclingData.map(data => data.maxHeartRate);
const bodyWeight = cyclingData.map(data => data.bodyWeight);
const fitnessLevel = cyclingData.map(data => data.fitnessLevel);

// grade represents the average slope steepness, it doesn't account for downhill slope
// grade = (elevation / distance) * 100
const grade = elevationGain.map((data, index) => (data / (distance[index] * 5280)) * 100);

// pace = duration / distance
const pace = duration.map((data, index) => data / distance[index]);

const heartRateReserve = avgHeartRate.map((data, index) => 
    (data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]]));

const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))

const caloriesBurned = MET.map((data, index) => parseInt(data * duration[index] * bodyWeight[index]));

const labels = cyclingData.map((data, index) => `ride ${index + 1}`)
const graphMargin = 3;

function CyclingMetrics() {
    const navigate = useNavigate();
    return (
        <Stack>
            <Typography fontSize={32}>CYCLING METRICS</Typography>
            <Stack>
                <Stack direction="row">
                    <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                        <BarChart
                            xAxis={[{ scaleType: "band", data: labels }]}
                            series={[{ data: distance, label: "Distance Cycled (Miles)" }]}
                            width={500}
                            height={300}
                        />
                    </Card>
                    <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[
                            {data: elevationGain, label: "Elevation Gain" }
                        ]}
                        width={500}
                        height={300}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: grade, label: "Grade Percentage" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: pace, label: "Pace: Time per Hour" }]}
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

export default CyclingMetrics;