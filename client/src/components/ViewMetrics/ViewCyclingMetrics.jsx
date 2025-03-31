import { Stack, Card, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import MyBarChart from '../MyBarChart.jsx';
import axios from 'axios';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50];

function ViewCyclingMetrics() {
    const [cyclingData, setCyclingData] = useState([]);

    const distance = cyclingData.map(data => data.distance);
    const duration = cyclingData.map(data => data.duration);
    const elevationGain = cyclingData.map(data => data.elevationGain);
    const avgHeartRate = cyclingData.map(data => data.avgHeartRate);
    const maxHeartRate = cyclingData.map(data => data.maxHeartRate);
    const bodyWeight = cyclingData.map(data => data.bodyWeight);
    const fitnessLevel = cyclingData.map(data => data.fitnessLevel);

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

    const labels = cyclingData.map((data, index) => `ride ${index + 1}`)
    const graphMargin = 3;

    
    useEffect(() => {
        getCyclingExercises();

        async function getCyclingExercises() {
            const res = await axios.get('http://localhost:3000/exercises', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    type: "cycle"
                }
            });
            setCyclingData(res.data);
        }
    
    }, [])

    return (
        <Stack alignItems={"center"}>
            <img src="/images/fitness_app_cycler.jpg" alt="caption of a cycler" width="85%"/>
            <Typography fontSize={36} marginTop={"5%"}>CYCLING METRICS</Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ distance ]} 
                        seriesLabel={[ "Distance Cycled (Miles)" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />                    
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ elevationGain ]} 
                        seriesLabel={[ "Elevation Gain" ]}
                        colors={[ theme.palette.secondary.main ]}
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

export default ViewCyclingMetrics;