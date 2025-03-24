import { Link as RouterLink } from 'react-router-dom';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import MuiLink from '@mui/material/Link';
import { useTheme } from '@emotion/react';

import MyBarChart from '../components/MyBarChart.jsx';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

function CyclingMetrics() {
    const [editingData, setEditingData] = useState(false);

    const [distanceIn, setDistanceIn] = useState(undefined);
    const [elevationGainIn, setElevationGainIn] = useState(undefined);
    const [durationIn, setDurationIn] = useState(undefined);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(undefined);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(undefined);
    const [bodyWeightIn, setBodyWeightIn] = useState(undefined);
    const [fitnessLevelIn, setFitnessLevelIn] = useState(undefined);

    const [cyclingData, setCyclingData] = useState([]);

    const theme = useTheme();

    const [errors, setErrors] = useState({
        distance: false,
        elevationGain: false,
        duration: false,
        avgHeartRate: false,
        maxHeartRate: false,
        bodyWeight: false,
        fitnessLevel: false
    })

    const distance = cyclingData.map(data => data.distance);
    const duration = cyclingData.map(data => data.duration);
    const elevationGain = cyclingData.map(data => data.elevationGain);
    const avgHeartRate = cyclingData.map(data => data.avgHeartRate);
    const maxHeartRate = cyclingData.map(data => data.maxHeartRate);
    const bodyWeight = cyclingData.map(data => data.bodyWeight);
    const fitnessLevel = cyclingData.map(data => data.fitnessLevel);

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
    const textInputSpacing = 3;

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }

    function handleClear() {
        setDistanceIn("");
        setElevationGainIn("");
        setDurationIn("");
        setAvgHeartRateIn("");
        setMaxHeartRateIn("");
        setBodyWeightIn("");
        setFitnessLevelIn("");
    }

    function handleSubmit() {
        if (!isError()) {
            setCyclingData(prevData => [
                ...prevData,
                {
                    distance: distanceIn,
                    elevationGain: elevationGainIn,
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
            distance: (distanceIn === undefined || distanceIn < 1),
            elevationGain: (elevationGainIn === undefined || elevationGainIn < 1),
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
        setCyclingData([])
    }
    
    return (
        <Stack>
            {/* <img src="/images/fitness_app_cycler.jpg" alt="caption of a cycler" /> */}
            <Typography fontSize={36}>CYCLING METRICS</Typography>
            <Stack>
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
            {!editingData ? (
                <></>
            ) : (
                <Card sx={{ padding:"40px", backgroundColor:"#828c85"}}>
                    <Typography marginBottom={5} fontSize={24}>Input Cycling Metrics</Typography>
                    <Stack direction="column" spacing={textInputSpacing}>
                        <TextField 
                            required
                            variant="filled" 
                            label="Distance"
                            type="number"
                            error={errors.distance}
                            value={distanceIn}
                            onChange={(e) => setDistanceIn(e.target.value)}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>Miles</InputAdornment>
                                }}
                        />
                        <TextField 
                            required
                            variant="filled" 
                            label="Elevation Gain"
                            type="number"
                            error={errors.elevationGain}
                            value={elevationGainIn}
                            onChange={(e) => setElevationGainIn(e.target.value)}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>Feet</InputAdornment>
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

export default CyclingMetrics;