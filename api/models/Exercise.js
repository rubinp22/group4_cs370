import mongoose from 'mongoose';

const Exercise = new mongoose.Schema({
    type: { type: String, default: '' },
    // A default value for userID is now specified. It corresponds with "dummyAlex" for now
    userID: { type:mongoose.Schema.Types.ObjectId, default: "67e4df16ece36e27ea77ae34" },
    // This could be a good alternative for when we have a proper user table implemented:
    // userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    // The above userID declaration explicitly links userID to a user table which could prove handy
    bodyWeight: { type: Number, default: -1 },
    fitnessLevel: { type: Number, default: -1 },
    distance: { type: Number, default: -1 },
    duration: { type: Number, default: -1 },
    steps: { type: Number, default: -1 },
    avgHeartRate: { type: Number, default: -1 },
    maxHeartRate: { type: Number, default: -1 },
    elevationGain: { type: Number, default: -1 },
    elevationLoss: { type: Number, default: -1 },
    lapCount: { type: Number, default: -1 },
    lapTimes: { type: Array, default: [] },
    strokeCount: { type: Array, default: [] },
    reps: { type: Number, default: -1 },
    sets: { type: Number, default: -1 },
    weightOfWeights: { type: Number, default: -1 },
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Exercises', Exercise);