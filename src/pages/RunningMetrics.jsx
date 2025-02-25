import { Link } from 'react-router-dom';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useState } from 'react';

const maxMETs = [10, 14, 18];
const restingHeartRates = [100, 70, 50]

function RunningMetrics() {
    const [editingData, setEditingData] = useState(false);
    const [distanceIn, setDistanceIn] = useState(0);
    const [durationIn, setDurationIn] = useState(0);
    const [stepsIn, setStepsIn] = useState(0);
    const [avgHeartRateIn, setAvgHeartRateIn] = useState(0);
    const [maxHeartRateIn, setMaxHeartRateIn] = useState(0);
    const [bodyWeightIn, setBodyWeightIn] = useState(0);
    const [fitnessLevelIn, setFitnessLevelIn] = useState(0);
    const [runningData, setRunningData] = useState([]);

    const distance = runningData.map(data => data.distance);
    const duration = runningData.map(data => data.duration);
    const steps = runningData.map(data => data.steps);
    const avgHeartRate = runningData.map(data => data.avgHeartRate);
    const maxHeartRate = runningData.map(data => data.maxHeartRate);
    const bodyWeight = runningData.map(data => data.bodyWeight);
    const fitnessLevel = runningData.map(data => data.fitnessLevel);

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
    const textInputSpacing = 3;

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }


    function handleSubmit() {
        setRunningData(prevData => [
            ...prevData,
            {
                distance: distanceIn,
                duration: durationIn,
                steps: stepsIn,
                avgHeartRate: avgHeartRateIn,
                maxHeartRate: maxHeartRateIn,
                bodyWeight: bodyWeightIn,
                fitnessLevel: fitnessLevelIn
            }
        ])
    }

    function handleReset() {
        setRunningData([])
    }
    

    return (
        <Stack>
            <Typography fontSize={32}>
                Running Metrics
            </Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: distance, label: "Distance Ran (Miles)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: speed, label: "Running Speed (MPH)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: pace, label: "Time per mile (in hours)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: cadence, label: "Cadence (Steps per minute)" }]}
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
            <Stack>
                {!editingData ? (
                    <></>
                ) : (
                    <Card sx={{ padding:"40px", backgroundColor:"#828c85"}}>
                        <Typography marginBottom={5} fontSize={24}>Input Running Metrics</Typography>
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
                                label="Steps"
                                type="number"
                                onChange={(e) => setStepsIn(e.target.value)}
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
            </Stack>
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

export default RunningMetrics