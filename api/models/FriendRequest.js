import mongoose from 'mongoose';

const FriendRequest = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId },
    reciever: { type: mongoose.Schema.Types.ObjectId },
    accepted: { type: Boolean, default: false}
});

export default mongoose.model('friendrequests', FriendRequest);