import express from 'express';
import cors from 'cors';
import './config/db';
import { createContactForm, getAllContactForms } from './controllers/contactFormController';
import { createUserSubscribed, getAllUserSubscribed } from './controllers/userSubscribedController';
import bodyParser from 'body-parser';
import { errorHandler } from './utils/errorHandler';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';


const app = express();
const contactFormLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1,
    message: 'You can only submit once per minute'
});
app.use(helmet());
const router: express.Router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

router.post('/contact-form', contactFormLimiter, createContactForm);
router.get('/contact-forms', getAllContactForms);
router.post('/user-subscribed', createUserSubscribed);
router.get('/user-subscribed', getAllUserSubscribed);

app.use(errorHandler)

app.use("/api/v1",router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});