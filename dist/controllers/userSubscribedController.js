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
exports.createUserSubscribed = exports.getAllUserSubscribed = void 0;
const userSubscribed_1 = require("../models/userSubscribed");
const zod_1 = require("zod");
const validateUserSubscribed = zod_1.z.object({
    email: zod_1.z.string().email()
});
const getAllUserSubscribed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userSubscribed = yield userSubscribed_1.UserSubscribed.find();
        res.status(200).json(userSubscribed);
    }
    catch (error) {
        console.error('Error getting user subscribed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllUserSubscribed = getAllUserSubscribed;
const createUserSubscribed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validateUserSubscribed.safeParse(req.body);
        console.log(result);
        if (!result.success) {
            console.log(result.error);
            return res.status(400).json({ error: result });
        }
        const existingUserSubscribed = yield userSubscribed_1.UserSubscribed.findOne({ email: req.body.email });
        if (existingUserSubscribed) {
            console.log('User already subscribed');
            return;
            // return res.status(409).json({ error: 'User already subscribed' });
        }
        const userSubscribed = new userSubscribed_1.UserSubscribed(req.body);
        yield userSubscribed.save();
        res.status(201).json({ message: 'User subscribed successfully' });
    }
    catch (error) {
        console.error('Error creating user subscribed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createUserSubscribed = createUserSubscribed;
