const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YourDashboardMessages@gmail.com', //Input here your email
        pass: '_' //Input here your pass
    }
});

module.exports = transporter;