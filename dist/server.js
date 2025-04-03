"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('./config/db');
const contactFormController_1 = require("./controllers/contactFormController");
const userSubscribedController_1 = require("./controllers/userSubscribedController");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
router.post('/contact-form', contactFormController_1.createContactForm);
router.get('/contact-forms', contactFormController_1.getAllContactForms);
router.post('/user-subscribed', userSubscribedController_1.createUserSubscribed);
router.get('/user-subscribed', userSubscribedController_1.getAllUserSubscribed);
app.use("/api/v1", router);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
