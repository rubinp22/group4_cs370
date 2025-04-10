import { Stack, Card, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import MyBarChart from '../MyBarChart.jsx';
import axios from 'axios';

import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

function ViewRunningMetrics() {
    const [runningData, setRunningData] = useState([]);

    const distance = runningData.map(data => data.distance);
    const duration = runningData.map(data => data.duration);
    const steps = runningData.map(data => data.steps);
    const avgHeartRate = runningData.map(data => data.avgHeartRate);
    const maxHeartRate = runningData.map(data => data.maxHeartRate);
    const bodyWeight = runningData.map(data => data.bodyWeight);
    const fitnessLevel = runningData.map(data => data.fitnessLevel);

    const theme = useTheme();

    // Global State
    const { state, dispatch } = useContext(GlobalStateContext)

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
        Math.abs((data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]])));

    const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))

    const caloriesBurned = MET.map((data, index) => parseInt(data * duration[index] * bodyWeight[index]));

    const labels = runningData.map((data, index) => `run ${index + 1}`)
    const graphMargin = 3;
    

    useEffect(() => {
        getRunningExercises();

        async function getRunningExercises() {
            const res = await axios.get('http://localhost:3000/exercises', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    type: "run",
                    userID: state.user
                }
            });
            setRunningData(res.data);
        }
    
    }, [])

    return (
        <Stack alignItems={"center"}>
            <Typography fontSize={36} marginTop={"5%"}>
                RUNNING METRICS
            </Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ distance ]} 
                        seriesLabel={[ "Distance Ran (Miles)" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />                    
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ speed ]} 
                        seriesLabel={[ "Running Speed (MPH)" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ pace ]}
                        seriesLabel={[ "Time per mile (in hours)" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ cadence ]}
                        seriesLabel={[ "Cadence (steps per minute)" ]}
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

export default ViewRunningMetrics;