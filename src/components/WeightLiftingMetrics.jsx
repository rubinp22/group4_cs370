import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

// Here I am declaring some sample data for weight lifting:

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

// Imagine this data represents someone who is continually improving at weight lifting
const weightLiftData = [
    {
        reps: 15,
        sets: 2,
        weightOfWeights: 5,     // in Kg
        bodyWeight: 70,         // also in Kg, equal to about 154 pounds
        age: 20,                // will come in handy later on to calculate max heart rates (220 - age)
        avgHeartRate: 125,      // average heart rate over the duration of the exercise (BPM)
        maxHeartRate: 156,      // maximum heart rate, not sustained over the duration of the exercise (just peak)
        duration: 0.25,         // duration of exercise in hours (useful for various calculations)
        fitnessLevel: 0,        // from 0 to 2, these values index the array of max MET values
    }, 
    {
        reps: 20,               // 5 more reps per set
        sets: 4,                // Double the sets
        weightOfWeights: 7.5,
        bodyWeight: 70,
        age: 20,
        avgHeartRate: 125,
        maxHeartRate: 160,
        duration: 0.50,         // Therefore, double the duration
        fitnessLevel: 0,
    },
    {
        reps: 25,               // 5 more reps per set
        sets: 4,
        weightOfWeights: 7.5,
        bodyWeight: 75,
        age: 20,
        avgHeartRate: 115,
        maxHeartRate: 145,
        duration: 0.60,
        fitnessLevel: 1,        // Now in better shape
    }, 
    {
        reps: 30,               // More reps
        sets: 4,
        weightOfWeights: 7.5,
        bodyWeight: 75,
        age: 20,            
        avgHeartRate: 120,
        maxHeartRate: 150,
        duration: 0.50,         // Now they are faster, even with more reps
        fitnessLevel: 1
    }, 
    {
        reps: 30,
        sets: 5,
        weightOfWeights: 10,    // Heavier weights
        bodyWeight: 80,         // More muscle mass
        age: 21,                // A year has passed
        avgHeartRate: 125,
        maxHeartRate: 158,
        duration: 0.65,         // Heavier weights take longer
        fitnessLevel: 2         // Now considered a professional weight lifter (usually takes longer than this but oh well)
    }
]
// Eventually we should allow users to input this data, but I want to keep things simple for now

function WeightLiftingMetrics() {
    const navigate = useNavigate();

    // Pulling individual data from the objects in weightLiftData into their own arrays
    const reps = weightLiftData.map(data => data.reps);
    const sets = weightLiftData.map(data => data.sets);
    const weightOfWeights = weightLiftData.map(data => data.weightOfWeights);
    const bodyWeight = weightLiftData.map(data => data.bodyWeight);
    const avgHeartRate = weightLiftData.map(data => data.avgHeartRate);
    const maxHeartRate = weightLiftData.map(data => data.maxHeartRate);
    const fitnessLevel = weightLiftData.map(data => data.fitnessLevel);
    const duration = weightLiftData.map(data => data.duration);

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
        (data - restingHeartRates[fitnessLevel[index]]) / (maxHeartRate[index] - restingHeartRates[fitnessLevel[index]]));

    // MET = (heartRateReserve * (maxMET - 1)) + 1
    // MET was explained earlier in the documentation, it is crucial for estimating calories burnt
    const MET = heartRateReserve.map((data, index) => (data * (maxMETs[fitnessLevel[index]] - 1) + 1))
    
    // caloriesBurned = MET * duration(hours) * bodyWeight(kg)
    const caloriesBurned = MET.map((data, index) => parseInt(data * duration[index] * bodyWeight[index]));

    const labels = weightLiftData.map((_, index) => `Session ${index + 1}`);

    const graphMargin = 3;

    // Stacks are MUI components that quickly let you stack nested components horizontally and vertically instead of 
    //      manually needing to define flex boxes through CSS
    // Cards are useful as backdrops to make other components stand out
    // Typography is an alternative component to any built in HTML text component (like H1 or P)
    //      Side Note: Page scrapers parsing through HTML will often use H1 components to "sum up" what a web page
    //      represents. If you use H1's through H6's a lot, you may confuse search engines. But we don't have to 
    //      worry about that.
    return (
        <Stack>
            <Typography fontSize={32}>
                Weight Lifting Metrics
            </Typography>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: totalReps, label: "Total Reps" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: totalVolume , label: "Total Volume (Kg)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
            </Stack>
            <Stack direction="row">
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: maxRep, label: "1 Rep Max (Kg)" }]}
                        width={500}
                        height={300}
                    />
                </Card>
                <Card sx={{ margin: graphMargin, backgroundColor: "#828c85",}}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: strengthRatio, label: "Strength to Weight Ratio" }]}
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
            <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
        </Stack>

    );
}

export default WeightLiftingMetrics