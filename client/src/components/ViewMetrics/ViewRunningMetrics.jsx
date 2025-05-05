import { Stack, Card, Typography, Slider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import MyBarChart from '../MyBarChart.jsx';
import axios from 'axios';

import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';
import { parseISO, compareAsc } from 'date-fns'

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

function ViewRunningMetrics() {
    const [runningData, setRunningData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    const distance = selectedData.map(data => data.distance);
    const duration = selectedData.map(data => data.duration);
    const steps = selectedData.map(data => data.steps);
    const avgHeartRate = selectedData.map(data => data.avgHeartRate);
    const maxHeartRate = selectedData.map(data => data.maxHeartRate);
    const bodyWeight = selectedData.map(data => data.bodyWeight);
    const fitnessLevel = selectedData.map(data => data.fitnessLevel);

    const [sliderRange, setSliderRange] = useState([runningData.length > 0 ? 1 : 0, runningData.length])

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

    const labels = selectedData.map((data, index) => `run ${index + 1}`)
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
            res.data.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));
            setRunningData(res.data);
            setSelectedData(res.data);
            setSliderRange([1, res.data.length])
        }
    
    }, [])

        // Changes the selected range of data
        function handleSliderChange(value, newValue) {
            const [min, max] = newValue;
    
            setSliderRange(newValue)
            setSelectedData(runningData.slice(min - 1, max));
        }
    
        // Formats the labels for each selected mark on the slider
        function valueText(value) {
            if (runningData.length > 0) {
                const item = runningData[value - 1];
                return(item.date.slice(0, 10));
            }
            
        }

    return (
        <Stack alignItems={"center"}>
            <Typography fontSize={"2rem"} marginTop={"5%"}>
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

                {/*Date Range Slider*/}
                {runningData.length > 1 ? (
                        <Stack width="100%" alignItems="center">
                            <Slider
                                aria-label="Exercise Range"
                                min={runningData.length > 0 ? 1 : 0}
                                max={runningData.length}
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

export default ViewRunningMetrics;