import { ContactForm } from '../models/contactForm';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../utils/apiResponse';
import { SERVER_ERROR } from '../utils/consts';

const validateContactForm = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    weddingDate: z.string(),
    guestCount: z.string(),
    service: z.string(),
    message: z.string(),
});

async function createContactForm (req: Request, res: Response, next: NextFunction) {
    try {
        const result = validateContactForm.safeParse(req.body);
        if (!result.success) {
            console.log(result.error);
            res.status(400).json({ error: result });
            return;
        }
        const contactForm = new ContactForm(req.body);
        await contactForm.save();
        successResponse(res, { message: 'Contact form submitted successfully' }, 201);
    } catch (error) {
        console.error('Error creating contact form:', error);
        errorResponse(res, SERVER_ERROR, 500);
    }
};

async function getAllContactForms (res: Response){
    try {
        const contactForms = await ContactForm.find();
        successResponse(res, contactForms, 200);
    } catch (error) {
        console.error('Error fetching contact forms:', error);
        errorResponse(res, SERVER_ERROR, 500);
    }
};

export { createContactForm, getAllContactForms };