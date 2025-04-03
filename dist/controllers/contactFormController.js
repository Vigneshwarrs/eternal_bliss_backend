"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContactForms = exports.createContactForm = void 0;
const contactForm_1 = require("../models/contactForm");
const zod_1 = require("zod");
const validateContactForm = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    weddingDate: zod_1.z.string(),
    guestCount: zod_1.z.string(),
    service: zod_1.z.string(),
    message: zod_1.z.string(),
});
const createContactForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validateContactForm.safeParse(req.body);
        console.log(result);
        if (!result.success) {
            console.log(result.error);
            return res.status(400).json({ error: result });
        }
        const existingContactForm = yield contactForm_1.ContactForm.findOne({
            email: req.body.email,
            createdAt: { $gte: new Date(Date.now() - 60 * 1000) }, // 1-minute limit
        });
        if (existingContactForm) {
            console.log('You can only submit once per minute');
            return res.status(429).json({ error: 'You can only submit once per minute' });
        }
        const contactForm = new contactForm_1.ContactForm(req.body);
        yield contactForm.save();
        res.status(201).json({ message: 'Contact form submitted successfully' });
    }
    catch (error) {
        console.error('Error creating contact form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createContactForm = createContactForm;
const getAllContactForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactForms = yield contactForm_1.ContactForm.find();
        res.status(200).json(contactForms);
    }
    catch (error) {
        console.error('Error fetching contact forms:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllContactForms = getAllContactForms;
