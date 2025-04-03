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
exports.createContactForm = createContactForm;
exports.getAllContactForms = getAllContactForms;
const contactForm_1 = require("../models/contactForm");
const zod_1 = require("zod");
const apiResponse_1 = require("../utils/apiResponse");
const consts_1 = require("../utils/consts");
const validateContactForm = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    weddingDate: zod_1.z.string(),
    guestCount: zod_1.z.string(),
    service: zod_1.z.string(),
    message: zod_1.z.string(),
});
function createContactForm(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = validateContactForm.safeParse(req.body);
            if (!result.success) {
                console.log(result.error);
                res.status(400).json({ error: result });
                return;
            }
            const contactForm = new contactForm_1.ContactForm(req.body);
            yield contactForm.save();
            (0, apiResponse_1.successResponse)(res, { message: 'Contact form submitted successfully' }, 201);
        }
        catch (error) {
            console.error('Error creating contact form:', error);
            (0, apiResponse_1.errorResponse)(res, consts_1.SERVER_ERROR, 500);
        }
    });
}
;
function getAllContactForms(res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contactForms = yield contactForm_1.ContactForm.find();
            (0, apiResponse_1.successResponse)(res, contactForms, 200);
        }
        catch (error) {
            console.error('Error fetching contact forms:', error);
            (0, apiResponse_1.errorResponse)(res, consts_1.SERVER_ERROR, 500);
        }
    });
}
;
