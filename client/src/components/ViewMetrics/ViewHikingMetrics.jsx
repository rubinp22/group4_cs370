import { Stack, Card, Typography, Slider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import MyBarChart from '../MyBarChart.jsx';
import axios from 'axios';

import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50];

function ViewHikingMetrics() {
    // Represents all data from our query
    const [hikingData, setHikingData] = useState([]);
    // Represnts the range of data selected from our query
    const [selectedData, setSelectedData] = useState([]);

    const distance = selectedData.map(data => data.distance);
    const elevationGain = selectedData.map(data => data.elevationGain);
    const elevationLoss = selectedData.map(data => data.elevationLoss);
    const duration = selectedData.map(data => data.duration);
    const avgHeartRate = selectedData.map(data => data.avgHeartRate);
    const maxHeartRate = selectedData.map(data => data.maxHeartRate);
    const bodyWeight = selectedData.map(data => data.bodyWeight);
    const fitnessLevel = selectedData.map(data => data.fitnessLevel);

    // If hikingData is of length 0, we don't want our minimum value to be 1
    const [sliderRange, setSliderRange] = useState([hikingData.length > 0 ? 1 : 0, hikingData.length])

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

    const labels = selectedData.map((data, index) => `hike ${index + 1}`)
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
                    type: "hike",
                    userID: state.user
                }
            });
            setHikingData(res.data);
            setSelectedData(res.data);
            setSliderRange([1, res.data.length])
        }
    
    }, [])


    // Changes the selected range of data
    function handleSliderChange(value, newValue) {
        const [min, max] = newValue;

        setSliderRange(newValue)
        setSelectedData(hikingData.slice(min - 1, max));
    }

    // Formats the labels for each selected mark on the slider
    function valueText(value) {
        if (hikingData.length > 0) {
            const item = hikingData[value - 1];
            return(item.date.slice(0, 10));
        }
        
    }


    return (
        <Stack alignItems={"center"}>
            <Typography fontSize={"2rem"} marginTop={"5%"}>HIKING METRICS</Typography>
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

                {/*Date Range Slider*/}
                {hikingData.length > 1 ? (
                        <Stack width="100%" alignItems="center">
                            <Slider
                                aria-label="Exercise Range"
                                min={hikingData.length > 0 ? 1 : 0}
                                max={hikingData.length}
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

export default ViewHikingMetrics;