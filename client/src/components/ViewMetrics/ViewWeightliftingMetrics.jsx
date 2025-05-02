import { Stack, Card, Typography, Slider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import MyBarChart from '../MyBarChart.jsx';
import axios from 'axios';

import GlobalStateContext from '../../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';

// MET (Metabolic Equivalent of Task) is defined as the energy expenditure for a given task
// An MET of 1 is measured as the energy expenditure at rest. 
// If you weigh 70 Kg (154 lbs), you burn 70 calories per hour (kcal/hr) at 1 MET
// Depending on your fitness level, your heart will have a cap on how much oxygen it can absorb. There are many
// other factors, but if you are out of shape, your max MET will be lower than if you were a highly trained athelete.
// These values will be used to estimate the calories burned in any given exercise. 
// 0 - Sedentary Individuals: 10
// 1 - Average Fitness: 14
// 2 - Highly Trained Atheletes: 18
const maxMETs = [10, 14, 18];

// Resting Heart Rates by fitness levels:
// 0 - Sedentary Individuals: 100
// 1 - Average Fitness: 70
// 2 - Highly Trained Atheletes: 50
const restingHeartRates = [100, 70, 50]

function ViewWeightliftingMetrics() {
    const [weightLiftData, setWeightLiftData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    const reps = selectedData.map(data => data.reps);
    const sets = selectedData.map(data => data.sets);
    const weightOfWeights = selectedData.map(data => data.weightOfWeights);
    const duration = selectedData.map(data => data.duration);
    const avgHeartRate = selectedData.map(data => data.avgHeartRate);
    const maxHeartRate = selectedData.map(data => data.maxHeartRate);
    const bodyWeight = selectedData.map(data => data.bodyWeight);
    const fitnessLevel = selectedData.map(data => data.fitnessLevel);

    const [sliderRange, setSliderRange] = useState([weightLiftData.length > 0 ? 1 : 0, weightLiftData.length])

    const theme = useTheme();

    // Global State
    const { state, dispatch } = useContext(GlobalStateContext)

    // totalReps = reps * sets
    const totalReps = reps.map((data, index) => data * sets[index]);
    // totalVolume = totalReps * weightofWeights        This represents the total weight lifted during a session
    const totalVolume = totalReps.map((data, index) => data * weightOfWeights[index]);

    // Uses Epley's formula to determine your theoretical maximum weight for a lift without you attempting a dangerous lift
    // Useful for tracking progress over time
    // Epley's formula: weightOfWeights * (1 + (totalReps / 30))
    const maxRep = weightOfWeights.map((data, index) => data * (1 + (totalReps[index] / 30)));

    // strengthRatio = maxRep / bodyWeight
    // Normalizes strength performance relative to body weight
    // A strength ratio of 0.5 means you can lift half of your body weight, while a ratio of 1 or more means you can lift
    // your body weight or more (like an ant 🐜)
    const strengthRatio = maxRep.map((data, index) => data / bodyWeight[index]);

    // heartRateReserve = ((avgHeartRate - restingHeartRate) / (maxHeartRate - restingHeartRate))
    // Expresses how much of your heart's available capacity you are using during exercise
    // A value of 50% indicates you were exercising at 50% of your heart rate reserve
    // Important for calculating the estimated calories burnt during a workout.
    const heartRateReserve = avgHeartRate.map((data, index) => 
        Math.abs((data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]])));

    // MET = (heartRateReserve * (maxMET - 1)) + 1
    // MET was explained earlier in the documentation, it is crucial for estimating calories burnt
    const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))
    
    // caloriesBurned = MET * duration(hours) * bodyWeight(kg)
    const caloriesBurned = MET.map((data, index) => parseInt(data * duration[index] * bodyWeight[index]));

    const labels = selectedData.map((_, index) => `Session ${index + 1}`);
    const graphMargin = 3;

    // Put DB fetching here:
    useEffect(() => {
        getWeightliftingExercises();

        async function getWeightliftingExercises() {
            const res = await axios.get('http://localhost:3000/exercises', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    type: "weights",
                    userID: state.user
                }
            });
            setWeightLiftData(res.data);
            setSelectedData(res.data);
            setSliderRange([1, res.data.length])
        }
    
    }, [])

        // Changes the selected range of data
        function handleSliderChange(value, newValue) {
            const [min, max] = newValue;
    
            setSliderRange(newValue)
            setSelectedData(weightLiftData.slice(min - 1, max));
        }
    
        // Formats the labels for each selected mark on the slider
        function valueText(value) {
            if (weightLiftData.length > 0) {
                const item = weightLiftData[value - 1];
                return(item.date.slice(0, 10));
            }
            
        }
    

    return (
        <Stack alignItems={"center"}>
            <Typography fontSize={"2rem"} marginTop={"5%"}>WEIGHTLIFTING METRICS</Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ totalReps ]} 
                        seriesLabel={[ "Total Reps" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />                    
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ totalVolume ]} 
                        seriesLabel={[ "Total Volume (Kg)" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />                    
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ maxRep ]} 
                        seriesLabel={[ "1 Rep Max (Kg)" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />                    
                </Card>
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ strengthRatio ]} 
                        seriesLabel={[ "Strength to Weight Ratio" ]}
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
                {weightLiftData.length > 1 ? (
                        <Stack width="100%" alignItems="center">
                            <Slider
                                aria-label="Exercise Range"
                                min={weightLiftData.length > 0 ? 1 : 0}
                                max={weightLiftData.length}
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

export default ViewWeightliftingMetrics;