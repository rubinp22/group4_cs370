import { Link as RouterLink } from 'react-router-dom';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import MuiLink from '@mui/material/Link';
import { useTheme } from '@emotion/react';

import MyBarChart from '../components/MyBarChart.jsx';

import { BarChart } from '@mui/x-charts';


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

function WeightLiftingMetrics() {
    const [editingData, setEditingData] = useState(false);

    const [repsIn, setRepsIn] = useState(undefined);
    const [setsIn, setSetsIn] = useState(undefined);
    const [weightOfWeightsIn, setWeightOfWeightsIn] = useState(undefined);
    const [durationIn, setDurationIn] = useState(undefined);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);
    const [bodyWeightIn, setBodyWeightIn] = useState(undefined);
    const [fitnessLevelIn, setFitnessLevelIn] = useState(undefined);

    const [weightLiftData, setWeightLiftData] = useState([]);

    const theme = useTheme();

    const [errors, setErrors] = useState({
        reps: false,
        sets: false,
        weightOfWeights: false,
        duration: false,
        avgHeartRate: false,
        maxHeartRate: false,
        bodyWeight: false,
        fitnessLevel: false
    })

    const reps = weightLiftData.map(data => data.reps);
    const sets = weightLiftData.map(data => data.sets);
    const weightOfWeights = weightLiftData.map(data => data.weightOfWeights);
    const duration = weightLiftData.map(data => data.duration);
    const avgHeartRate = weightLiftData.map(data => data.avgHeartRate);
    const maxHeartRate = weightLiftData.map(data => data.maxHeartRate);
    const bodyWeight = weightLiftData.map(data => data.bodyWeight);
    const fitnessLevel = weightLiftData.map(data => data.fitnessLevel);
    

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

    const labels = weightLiftData.map((_, index) => `Session ${index + 1}`);
    const graphMargin = 3;
    const textInputSpacing = 3;

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }

    function handleClear() {
        setRepsIn("");
        setSetsIn("");
        setWeightOfWeightsIn("");
        setDurationIn("");
        setAvgHeartRateIn("");
        setMaxHeartRateIn("");
        setBodyWeightIn("");
        setFitnessLevelIn("");
    }

    function handleSubmit() {
        if (!isError()) {
            setWeightLiftData(prevData => [
                ...prevData,
                {
                    reps: repsIn,
                    sets: setsIn,
                    weightOfWeights: weightOfWeightsIn,
                    duration: durationIn,
                    avgHeartRate: avgHeartRateIn,
                    maxHeartRate: maxHeartRateIn,
                    bodyWeight: bodyWeightIn,
                    fitnessLevel: fitnessLevelIn
                }
            ])
        }
    }

    function isError() {
        let newErrors = {
            reps: (repsIn === undefined || repsIn < 1),
            sets: (setsIn === undefined || setsIn < 1),
            weightOfWeights: (weightOfWeightsIn === undefined || weightOfWeightsIn < 1),
            duration: (durationIn === undefined || durationIn < 1),
            avgHeartRate: (avgHeartRateIn === undefined || avgHeartRateIn < 1),
            maxHeartRate: (maxHeartRateIn === undefined || maxHeartRateIn < 1),
            bodyWeight: (bodyWeightIn === undefined || bodyWeightIn < 1),
            fitnessLevel: (fitnessLevelIn === undefined || fitnessLevelIn < 0 || fitnessLevelIn > 2),

        }

        setErrors(newErrors);

        let newErrorsArray = Object.values(newErrors)
        let errorFound = false;

        newErrorsArray.forEach(val => {
            if (val === true) {
                errorFound = true;
            }
        })

        return errorFound;
    }

    function handleReset() {
        setWeightLiftData([])
    }

    return (
        <Stack alignItems={"center"}>
            <img src="/images/fitness_app_weights.jpg" alt="Gym that contains some weights" width="85%"/>
            <Typography fontSize={36} marginTop={"5%"}>
                WEIGHTLIFTING METRICS
            </Typography>
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
                {/* <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: caloriesBurned, label: "Estimated Calories Burned" }]}
                        width={500}
                        height={300}
                    />
                </Card> */}
                <Card sx={{ margin: graphMargin }}>
                    <MyBarChart 
                        labels={ labels } 
                        dataSets={[ caloriesBurned ]} 
                        seriesLabel={[ "Estimated Calories Burned" ]}
                        colors={[ theme.palette.secondary.main ]}
                    />                    
                </Card>
            </Stack>
            {!editingData ? (
                <></>
            ) : (
                <Stack width="85%">
                    <Card sx={{ padding:"40px" }}>
                        <Typography marginBottom={5} fontSize={36}>Input Weightlifting Metrics</Typography>
                        <Stack direction="column" spacing={textInputSpacing}>
                            <TextField 
                                required
                                variant="filled" 
                                label="Reps"
                                type="number"
                                error={errors.reps}
                                value={repsIn}
                                onChange={(e) => setRepsIn(e.target.value)}
                            />
                            <TextField 
                                required
                                variant="filled" 
                                label="Sets"
                                type="number"
                                error={errors.sets}
                                value={setsIn}
                                onChange={(e) => setSetsIn(e.target.value)}
                            />
                            <TextField 
                                required 
                                variant="filled" 
                                label="Weight of Weights"
                                type="number"
                                error={errors.weightOfWeights}
                                value={weightOfWeightsIn}
                                onChange={(e) => setWeightOfWeightsIn(e.target.value)}
                                InputProps={{ 
                                    endAdornment: <InputAdornment position='end'>Kg</InputAdornment>
                                    }}
                            />
                            <TextField 
                                required 
                                variant="filled" 
                                label="Duration"
                                type="number"
                                error={errors.duration}
                                value={durationIn}
                                onChange={(e) => setDurationIn(e.target.value)}
                                InputProps={{ 
                                    endAdornment: <InputAdornment position='end'>Hours</InputAdornment>
                                    }}
                            />
                            <TextField 
                                required 
                                variant="filled" 
                                label="Average Heart Rate"
                                type="number"
                                error={errors.avgHeartRate}
                                value={avgHeartRateIn}
                                onChange={(e) => setAvgHeartRateIn(e.target.value)}
                            />
                            <TextField 
                                required 
                                variant="filled" 
                                label="Maximum Heart Rate"
                                type="number"
                                error={errors.maxHeartRate}
                                value={maxHeartRateIn}
                                onChange={(e) => setMaxHeartRateIn(e.target.value)}
                            />
                            <TextField 
                                required 
                                variant="filled" 
                                label="Bodyweight"
                                type="number"
                                error={errors.bodyWeight}
                                value={bodyWeightIn}
                                onChange={(e) => setBodyWeightIn(e.target.value)}
                                InputProps={{ 
                                    endAdornment: <InputAdornment position='end'>Kg</InputAdornment>
                                    }}
                            />
                            <TextField 
                                required 
                                variant="filled" 
                                label="Fitness Level"
                                type="number"
                                error={errors.fitnessLevel}
                                value={fitnessLevelIn}
                                onChange={(e) => setFitnessLevelIn(e.target.value)}
                                InputProps={{ 
                                    endAdornment: <InputAdornment position='end'>(0 - 2)</InputAdornment>
                                    }}
                            />
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                            <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                            <Button variant="contained" color="error" onClick={handleReset}>Reset Data</Button>
                        </Stack>
                        
                    </Card>
                </Stack>
            )}
            <Stack direction="row" marginTop={5} spacing={5} justifyContent="center">
                <Button variant="contained" 
                    onClick={handleEdit}
                >
                    {editingData ? "Stop Editing" : "Edit Data"}
                </Button>
                <MuiLink to="../fitnessTypes" component={RouterLink} className="button-link">Back to Fitness Types</MuiLink>
            </Stack>
        </Stack>

    );
}

export default WeightLiftingMetrics