import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    weddingDate: { type: String, required: true },
    guestCount: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
},{
    timestamps: true
});

export const ContactForm = mongoose.model('ContactForm', contactFormSchema);