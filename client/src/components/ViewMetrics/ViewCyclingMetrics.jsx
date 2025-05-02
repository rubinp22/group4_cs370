import { Stack, Card, Typography, Slider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import MyBarChart from '../MyBarChart.jsx';
import axios from 'axios';

import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50];

function ViewCyclingMetrics() {
    const [cyclingData, setCyclingData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    const distance = selectedData.map(data => data.distance);
    const duration = selectedData.map(data => data.duration);
    const elevationGain = selectedData.map(data => data.elevationGain);
    const avgHeartRate = selectedData.map(data => data.avgHeartRate);
    const maxHeartRate = selectedData.map(data => data.maxHeartRate);
    const bodyWeight = selectedData.map(data => data.bodyWeight);
    const fitnessLevel = selectedData.map(data => data.fitnessLevel);

    const [sliderRange, setSliderRange] = useState([cyclingData.length > 0 ? 1 : 0, cyclingData.length])
    

    const theme = useTheme();

    // Global State
    const { state, dispatch } = useContext(GlobalStateContext)

    // grade represents the average slope steepness, it doesn't account for downhill slope
    // grade = (elevation / distance) * 100
    const grade = elevationGain.map((data, index) => (data / (distance[index] * 5280)) * 100);

    // pace = duration / distance
    const pace = duration.map((data, index) => data / distance[index]);

    const heartRateReserve = avgHeartRate.map((data, index) => 
        Math.abs((data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]])));

    const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))

    const caloriesBurned = MET.map((data, index) => parseInt(data * duration[index] * bodyWeight[index]));

    const labels = selectedData.map((data, index) => `ride ${index + 1}`)
    const graphMargin = 3;

    
    useEffect(() => {
        getCyclingExercises();

        async function getCyclingExercises() {
            const res = await axios.get('http://localhost:3000/exercises', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    type: "cycle",
                    userID: state.user
                }
            });
            setCyclingData(res.data);
            setSelectedData(res.data);
            setSliderRange([1, res.data.length])
        }
    
    }, [])

        // Changes the selected range of data
        function handleSliderChange(value, newValue) {
            const [min, max] = newValue;
    
            setSliderRange(newValue)
            setSelectedData(cyclingData.slice(min - 1, max));
        }
    
        // Formats the labels for each selected mark on the slider
        function valueText(value) {
            if (cyclingData.length > 0) {
                const item = cyclingData[value - 1];
                return(item.date.slice(0, 10));
            }
            
        }

    return (
        <Stack alignItems={"center"}>
            <Typography fontSize={"2rem"} marginTop={"5%"}>CYCLING METRICS</Typography>
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

                {/*Date Range Slider*/}
                {cyclingData.length > 1 ? (
                        <Stack width="100%" alignItems="center">
                            <Slider
                                aria-label="Exercise Range"
                                min={cyclingData.length > 0 ? 1 : 0}
                                max={cyclingData.length}
                                marks={true}
                                onChange={handleSliderChange}
                                value={sliderRange}
                                valueLabelDisplay="on"
                                valueLabelFormat={valueText}
                                sx={{ marginTop: "5%", marginBottom: "1%", height: "8px"}}
                                disableSwap
                            />
                            <Typography fontSize={24}>Select a date range</Typography>
                        </Stack>

                    ) : (
                        <></>
                    )
                }

        </Stack>
    );
}

export default ViewCyclingMetrics;