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
exports.createUserSubscribed = createUserSubscribed;
exports.getAllUserSubscribed = getAllUserSubscribed;
const userSubscribed_1 = require("../models/userSubscribed");
const zod_1 = require("zod");
const apiResponse_1 = require("../utils/apiResponse");
const consts_1 = require("../utils/consts");
const validateUserSubscribed = zod_1.z.object({
    email: zod_1.z.string().email()
});
function createUserSubscribed(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = validateUserSubscribed.safeParse(req.body);
            console.log(result);
            if (!result.success) {
                (0, apiResponse_1.errorResponse)(res, result.error.issues[0].message, 400);
                return;
            }
            const existingUserSubscribed = yield userSubscribed_1.UserSubscribed.findOne({ email: req.body.email });
            if (existingUserSubscribed) {
                console.log('User already subscribed');
                return;
            }
            const userSubscribed = new userSubscribed_1.UserSubscribed(req.body);
            yield userSubscribed.save();
            (0, apiResponse_1.successResponse)(res, { message: 'User subscribed successfully' }, 201);
        }
        catch (error) {
            console.error('Error creating user subscribed:', error);
            (0, apiResponse_1.errorResponse)(res, consts_1.SERVER_ERROR, 500);
        }
    });
}
;
function getAllUserSubscribed(res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userSubscribed = yield userSubscribed_1.UserSubscribed.find();
            (0, apiResponse_1.successResponse)(res, userSubscribed, 200);
        }
        catch (error) {
            console.error('Error getting user subscribed:', error);
            (0, apiResponse_1.errorResponse)(res, consts_1.SERVER_ERROR, 500);
        }
    });
}
;
