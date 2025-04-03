"use strict";
const db = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
db.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
