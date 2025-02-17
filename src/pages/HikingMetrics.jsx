import { Link } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

const hikingData = [
  {
    distance: 3,          // In miles
    elevationGain: 500,   // Elevation gain in feet
    elevationLoss: -200,
    duration: 1,          // In hours
    avgHeartRate: 120,
    maxHeartRate: 145,
    bodyWeight: 70,       // 70Kg = 154lbs
    fitnessLevel: 0,
  },
  {
    distance: 4,          
    elevationGain: 600,
    elevationLoss: -200,   
    duration: 1.25,          
    avgHeartRate: 125,
    maxHeartRate: 150,
    bodyWeight: 70,       
    fitnessLevel: 0,
  },
  {
    distance: 5,          
    elevationGain: 800,
    elevationLoss: -300,   
    duration: 1.25,          
    avgHeartRate: 120,
    maxHeartRate: 140,
    bodyWeight: 70,       
    fitnessLevel: 1,
  },
  {
    distance: 8,          
    elevationGain: 1000,
    elevationLoss: -100,   
    duration: 1.75,          
    avgHeartRate: 115,
    maxHeartRate: 140,
    bodyWeight: 65,       
    fitnessLevel: 1,
  },
  {
    distance: 9.50,          
    elevationGain: 900,
    elevationLoss: -400,   
    duration: 2,          
    avgHeartRate: 125,
    maxHeartRate: 150,
    bodyWeight: 65,       
    fitnessLevel: 2,
  },
]

function HikingMetrics() { 

    const distance = hikingData.map(data => data.distance);
    const elevationGain = hikingData.map(data => data.elevationGain);
    const elevationLoss = hikingData.map(data => data.elevationLoss);
    const duration = hikingData.map(data => data.duration);
    const avgHeartRate = hikingData.map(data => data.avgHeartRate);
    const maxHeartRate = hikingData.map(data => data.maxHeartRate);
    const bodyWeight = hikingData.map(data => data.bodyWeight);
    const fitnessLevel = hikingData.map(data => data.fitnessLevel);

    // grade represents the average slope steepness, it doesn't account for downhill slope
    // grade = (elevation / distance) * 100
    const grade = elevationGain.map((data, index) => (data / (distance[index] * 5280)) * 100);

    // pace = duration / distance
    const pace = duration.map((data, index) => data / distance[index]);

    const heartRateReserve = avgHeartRate.map((data, index) => 
      (data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]]));
  
    const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))
  
    const caloriesBurned = MET.map((data, index) => parseInt(data * duration[index] * bodyWeight[index]));

    const labels = hikingData.map((data, index) => `hike ${index + 1}`)
    const graphMargin = 3;

return (
    <Stack>
        <Typography fontSize={32}>HIKING METRICS</Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: distance, label: "Distance Hiked (Miles)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[
                            {data: elevationLoss, label: "Elevation Loss" },
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

            <Link to="../fitnessTypes" className="button-link">Back to Fitness Types</Link>

    </Stack>
    
  );

}

export default HikingMetrics 