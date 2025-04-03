"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactForm = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contactFormSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    weddingDate: { type: String, required: true },
    guestCount: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true
});
exports.ContactForm = mongoose_1.default.model('ContactForm', contactFormSchema);
