import mongoose from 'mongoose';

const RunningExercise = new mongoose.Schema({
    distance: Number,
    duration: Number,
    steps: Number,
    avgHeartRate: Number,
    maxHeartRate: Number,
    bodyWeight: Number,
    fitnessLevel: Number
});

export default mongoose.model('RunningEntries', RunningExercise);

