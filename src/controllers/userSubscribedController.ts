import { UserSubscribed } from "../models/userSubscribed";
import { Request, Response } from "express";
import {z} from "zod";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { SERVER_ERROR } from "../utils/consts";

const validateUserSubscribed = z.object({
    email: z.string().email()
});

async function createUserSubscribed (req: Request, res: Response)  {
    try {
        const result = validateUserSubscribed.safeParse(req.body);
        console.log(result);
        if (!result.success) {
            errorResponse(res, result.error.issues[0].message, 400);
            return;
        }
        const existingUserSubscribed = await UserSubscribed.findOne({ email: req.body.email });
        if (existingUserSubscribed) {
            console.log('User already subscribed');
            return;
        }
        const userSubscribed = new UserSubscribed(req.body);
        await userSubscribed.save();
        successResponse(res, { message: 'User subscribed successfully' }, 201);
    } catch (error) {
        console.error('Error creating user subscribed:', error);
        errorResponse(res, SERVER_ERROR, 500);
    }    
};

async function getAllUserSubscribed  (res: Response) {
    try {
        const userSubscribed = await UserSubscribed.find();
        successResponse(res, userSubscribed, 200);
    } catch (error) {
        console.error('Error getting user subscribed:', error);
        errorResponse(res, SERVER_ERROR ,500);
    }
};


export { createUserSubscribed, getAllUserSubscribed };