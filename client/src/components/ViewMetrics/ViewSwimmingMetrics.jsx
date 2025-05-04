import { Stack, Card, Typography, Slider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { BarChart } from '@mui/x-charts';
import MyBarChart from '../MyBarChart.jsx';
import axios from 'axios';

// Not currently in use, will have to determine how to implement a color scale. More info below:
import MyLapBarChart from '../MyLapBarChart.jsx';

import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';
import { parseISO, compareAsc } from 'date-fns'


const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50];

function ViewSwimmingMetrics() {
    const [swimmingData, setSwimmingData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    const lapCount = selectedData.map(data => data.lapCount);
    const lapTimes = selectedData.map(data => data.lapTimes);
    const strokeCount = selectedData.map(data => data.strokeCount);
    const avgHeartRate = selectedData.map(data => data.avgHeartRate);
    const maxHeartRate = selectedData.map(data => data.maxHeartRate);
    const bodyWeight = selectedData.map(data => data.bodyWeight);
    const fitnessLevel = selectedData.map(data => data.fitnessLevel);

    const [sliderRange, setSliderRange] = useState([swimmingData.length > 0 ? 1 : 0, swimmingData.length])

    const theme = useTheme();

    // Global State
    const { state, dispatch } = useContext(GlobalStateContext)

    // Finding the duration (in minutes) of each swim by totaling each lap for each swim
    // Dividing my 60 because lap times are stored in seconds
    const duration = lapTimes.map(data => {
        return (data.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        ) / 60)
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
    let transposed = [];
    if (lapTimes.length > 0) {
        transposed = lapTimes[longestLapIdx].map((data, colIndex) => lapTimes.map(row => row[colIndex]));
    }

    // Creating an array of objects with "data" and "label", this is the format MUI X Charts accepts
    const result = transposed.map((data, index) => ({
        data: data,
        label: `lap ${index + 1}`
    }));

    // Distance = lapCount * poolLength
    // Olympic/competitive pool sizes are heavily regulated at a standard 50 meters long
    const distance = lapCount.map(data => data * 50);

    const heartRateReserve = avgHeartRate.map((data, index) => 
        Math.abs((data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]])));

    const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))

    const caloriesBurned = MET.map((data, index) => parseInt(data * (duration[index] / 60) * bodyWeight[index]));

    const labels = selectedData.map((_, index) => `swim ${index + 1}`)
    const graphMargin = 3;

    // Put DB fetching here:
    useEffect(() => {
        getSwimmingExercises();

        async function getSwimmingExercises() {
            const res = await axios.get('http://localhost:3000/exercises', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    type: "swim",
                    userID: state.user
                }
            });
            res.data.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));
            setSwimmingData(res.data);
            setSelectedData(res.data);
            setSliderRange([1, res.data.length])
        }
    
    }, [])

        // Changes the selected range of data
        function handleSliderChange(value, newValue) {
            const [min, max] = newValue;
    
            setSliderRange(newValue)
            setSelectedData(swimmingData.slice(min - 1, max));
        }
    
        // Formats the labels for each selected mark on the slider
        function valueText(value) {
            if (swimmingData.length > 0) {
                const item = swimmingData[value - 1];
                return(item.date.slice(0, 10));
            }
            
        }

    return (
        <Stack alignItems={"center"}>
            <Typography fontSize={"2rem"} marginTop={"5%"}>SWIMMING METRICS</Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart
                        labels={labels}
                        dataSets={[distance]}
                        seriesLabel={["Distance Swam (meters)"]}
                        colors={[theme.palette.secondary.main]}
                    />
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart
                        labels={labels}
                        dataSets={[duration]}
                        seriesLabel={["Time per Swim (minutes)"]}
                        colors={[theme.palette.secondary.main]}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={result.map(item => ({ ...item, stack: "total" }))}
                        width={400}
                        height={250}
                    />
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart
                        labels={labels}
                        dataSets={[strokeRate]}
                        seriesLabel={["Strokes per minutes"]}
                        colors={[theme.palette.secondary.main]}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart
                        labels={labels}
                        dataSets={[avgHeartRate, maxHeartRate]}
                        seriesLabel={["Avg Heart Rate", "Max Heart Rate"]}
                        colors={[
                            theme.palette.secondary.main,
                            theme.palette.secondary.dark,
                        ]}
                    />
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart
                        labels={labels}
                        dataSets={[caloriesBurned]}
                        seriesLabel={["Estimated Calories Burned"]}
                        colors={[theme.palette.secondary.main]}
                    />
                </Card>
            </Stack>

                {/*Date Range Slider*/}
                {swimmingData.length > 1 ? (
                        <Stack width="100%" alignItems="center">
                            <Slider
                                aria-label="Exercise Range"
                                min={swimmingData.length > 0 ? 1 : 0}
                                max={swimmingData.length}
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

export default ViewSwimmingMetrics;