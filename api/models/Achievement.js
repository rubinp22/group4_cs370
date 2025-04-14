import mongoose from 'mongoose';


const Achievement = new mongoose.Schema({
    achievementID: { type:mongoose.Schema.Types.ObjectId, default: '' },
    name: { type: String, default: '' },
    metric: { type: String, default: ''},
    category: { type: String, default: ''},
    requirement: { type: Number, default: -1}
});

export default mongoose.model('Achievements', Achievement);