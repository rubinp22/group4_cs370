import { useNavigate } from 'react-router-dom';
import { Stack, Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

// Here I am declaring some sample data for weight lifting:

// MET (Metabolic Equivalent of Task) is defined as the energy expenditure for a given task
// An MET of 1 is measured as the energy expenditure at rest. 
// If you weigh 70 Kg (154 lbs), you burn 70 calories per hour (kcal/hr)
// Depending on your fitness level, your heart will have a cap on how much oxygen it can absorb. There are many
// other factors, but if you are out of shape, your max MET will be lower than if you were a highly trained athelete.
// These values will be used to estimate the calories burned in any given exercise. 
let maxMETs = [10, 14, 18];

// Imagine this data represents someone who is continually improving at weight lifting
let weightLiftData = [
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


function WeightLiftingMetrics () {
    const navigate = useNavigate();

    return (
        <>
            {/* Card and BarChart are MUI components. They each have an attribute called sx which can be used
            to add additional styling */}
            <Card sx={{ marginBottom: 5, backgroundColor: "#828c85",}}>
                <BarChart
                    xAxis={[{ scaleType: 'band', 
                        data: 
                            [
                                'Reps over Time', 
                                'Sets over Time', 
                                'Weight over Time'
                            ] 
                    }]}
                    series={[
                        { data: [weightLiftData[0].reps, weightLiftData[0].sets, weightLiftData[0].weightOfWeights] }, 
                        { data: [weightLiftData[1].reps, weightLiftData[1].sets, weightLiftData[1].weightOfWeights] }, 
                        { data: [weightLiftData[2].reps, weightLiftData[2].sets, weightLiftData[2].weightOfWeights] },
                        { data: [weightLiftData[3].reps, weightLiftData[3].sets, weightLiftData[3].weightOfWeights] },
                        { data: [weightLiftData[4].reps, weightLiftData[4].sets, weightLiftData[4].weightOfWeights] }
                    ]}
                    width={700}
                    height={300}
                />
            </Card>

            <button onClick={() => navigate('/fitnessTypes')}>Back to Fitness Types</button>
        </>
        

    );
}

export default WeightLiftingMetrics