import mongoose from "mongoose";

const userSubscribedSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscribed: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

export const UserSubscribed = mongoose.model('UserSubscribed', userSubscribedSchema);