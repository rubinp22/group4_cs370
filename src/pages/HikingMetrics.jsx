import { Link } from 'react-router-dom';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useState } from 'react';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

function HikingMetrics() {
    const [editingData, setEditingData] = useState(false);

    const [distanceIn, setDistanceIn] = useState(0);
    const [elevationGainIn, setElevationGainIn] = useState(0);
    const [elevationLossIn, setElevationLossIn] = useState(0);
    const [durationIn, setDurationIn] = useState(0);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(0);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(0);
    const [bodyWeightIn, setBodyWeightIn] = useState(0);
    const [fitnessLevelIn, setFitnessLevelIn] = useState(0);

    const [hikingData, setHikingData] = useState([]);

    const distance = hikingData.map(data => data.distance);
    const elevationGain = hikingData.map(data => data.elevationGain);
    const elevationLoss = hikingData.map(data => data.elevationLoss);
    const duration = hikingData.map(data => data.duration);
    const avgHeartRate = hikingData.map(data => data.avgHeartRate);
    const maxHeartRate = hikingData.map(data => data.maxHeartRate);
    const bodyWeight = hikingData.map(data => data.bodyWeight);
    const fitnessLevel = hikingData.map(data => data.fitnessLevel);

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
    const textInputSpacing = 3;

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }

    function handleSubmit() {
        setHikingData(prevData => [
            ...prevData,
            {
                distance: distanceIn,
                elevationGain: elevationGainIn,
                elevationLoss: elevationLossIn,
                duration: durationIn,
                avgHeartRate: avgHeartRateIn,
                maxHeartRate: maxHeartRateIn,
                bodyWeight: bodyWeightIn,
                fitnessLevel: fitnessLevelIn
            }
        ])
    }

    function handleReset() {
        setHikingData([])
    }

return (
    <Stack>
        <Typography fontSize={32}>HIKING METRICS</Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: distance, label: "Distance Hiked (Miles)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[
                            {data: elevationLoss, label: "Elevation Loss" },
                            {data: elevationGain, label: "Elevation Gain" }
                        ]}
                        width={500}
                        height={300}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: grade, label: "Grade Percentage" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: pace, label: "Pace: Time per Hour" }]}
                        width={500}
                        height={300}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[
                            {data: avgHeartRate, label: "Avg Heart Rate" },
                            {data: maxHeartRate, label: "Max Heart Rate" }
                        ]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: caloriesBurned, label: "Estimated Calories Burned" }]}
                        width={500}
                        height={300}
                    />
                </Card>
            </Stack>

            {!editingData ? (
                <></>
            ) : (
                <Card sx={{ padding:"40px", backgroundColor:"#828c85"}}>
                    <Typography marginBottom={5} fontSize={24}>Input Hiking Metrics</Typography>
                    <Stack direction="column" spacing={textInputSpacing}>
                        <TextField 
                            required
                            variant="filled" 
                            label="Distance"
                            type="number"
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
                            onChange={(e) => setElevationGainIn(e.target.value)}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>Feet</InputAdornment>
                                }}
                        />
                        <TextField 
                            required
                            variant="filled" 
                            label="Elevation Loss"
                            type="number"
                            onChange={(e) => setElevationLossIn(e.target.value)}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>Feet</InputAdornment>
                                }}
                        />
                        <TextField 
                            required 
                            variant="filled" 
                            label="Duration"
                            type="number"
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
                            onChange={(e) => setAvgHeartRateIn(e.target.value)}
                        />
                        <TextField 
                            required 
                            variant="filled" 
                            label="Maximum Heart Rate"
                            type="number"
                            onChange={(e) => setMaxHeartRateIn(e.target.value)}
                        />
                        <TextField 
                            required 
                            variant="filled" 
                            label="Bodyweight"
                            type="number"
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
                            onChange={(e) => setFitnessLevelIn(e.target.value)}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>(0 - 2)</InputAdornment>
                                }}
                        />
                    </Stack>

                    <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
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
                <Link to="../fitnessTypes" className="button-link">Back to Fitness Types</Link>
            </Stack>

    </Stack>
    
  );

}

export default HikingMetrics 