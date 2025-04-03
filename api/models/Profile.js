import mongoose from 'mongoose';

const Profile = new mongoose.Schema({
    name: { type: String, default: ''},
    exercises: { type: Array, default: []},
    friends: { type: Array, default: []},
    goals: { type: Array, default: []},
    achievements: { type: Array, default: []},
    bmi: { type: Number, default: -1},
    username: { type: String, default: 'defaultUser'},
    password: { type: String, default: 'defaultPass'},
    fitnessLevel: { type: Number, default: -1 },
    dateJoined: { type: Date, default: Date.now },
    heightFeet: { type: Number, default: -1},
    heightInch: { type: Number, default: -1},
    weight: { type: Array, default: []},
    pfp: { type: String, default: '/images/profileImages/profile13.png'},
    description: { type: String, default: '' }
});

export default mongoose.model('users', Profile);