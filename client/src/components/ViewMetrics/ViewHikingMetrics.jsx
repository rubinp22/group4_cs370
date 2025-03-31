import { Stack, Card, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import MyBarChart from '../MyBarChart.jsx';
import axios from 'axios';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50];

function ViewHikingMetrics() {
    const [hikingData, setHikingData] = useState([]);

    const distance = hikingData.map(data => data.distance);
    const elevationGain = hikingData.map(data => data.elevationGain);
    const elevationLoss = hikingData.map(data => data.elevationLoss);
    const duration = hikingData.map(data => data.duration);
    const avgHeartRate = hikingData.map(data => data.avgHeartRate);
    const maxHeartRate = hikingData.map(data => data.maxHeartRate);
    const bodyWeight = hikingData.map(data => data.bodyWeight);
    const fitnessLevel = hikingData.map(data => data.fitnessLevel);

    const theme = useTheme();

    // grade represents the average slope steepness, it doesn't account for downhill slope
    // grade = (elevation / distance) * 100
    const grade = elevationGain.map((data, index) => (data / (distance[index] * 5280)) * 100);

    // pace = duration / distance
    const pace = duration.map((data, index) => data / distance[index]);

    const heartRateReserve = avgHeartRate.map((data, index) => 
      Math.abs((data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]])));
  
    const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))
  
    const caloriesBurned = MET.map((data, index) => parseInt(data * duration[index] * bodyWeight[index]));

    const labels = hikingData.map((data, index) => `hike ${index + 1}`)
    const graphMargin = 3;

    // Put DB fetching here:
    useEffect(() => {
        getHikingExercises();

        async function getHikingExercises() {
            const res = await axios.get('http://localhost:3000/exercises', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    type: "hike"
                }
            });
            setHikingData(res.data);
        }
    
    }, [])

    return (
        <Stack alignItems={"center"}>
            <img src="/images/fitness_app_hiker.jpg" alt="Hikers in a trail" width="85%"/>
            <Typography fontSize={36} marginTop={"5%"}>HIKING METRICS</Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ distance ]} 
                        seriesLabel={[ "Distance Hiked (Miles)" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />                    
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ elevationLoss, elevationGain ]} 
                        seriesLabel={[ "Elevation Loss", "Elevation Gain" ]}
                        colors={[ theme.palette.secondary.main, theme.palette.secondary.dark ]}
                    />                    
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ grade ]} 
                        seriesLabel={[ "Grade Percentage" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />                    
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ pace ]} 
                        seriesLabel={[ "Pace: Time per Hour" ]}
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
        </Stack>
    );
}

export default ViewHikingMetrics;