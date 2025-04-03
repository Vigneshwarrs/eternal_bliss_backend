"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscribed = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSubscribedSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscribed: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
exports.UserSubscribed = mongoose_1.default.model('UserSubscribed', userSubscribedSchema);
