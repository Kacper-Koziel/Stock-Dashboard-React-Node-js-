const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YourDashboardMessages@gmail.com', //Input here your email
        pass: `${process.env.NODEMAILER_API_KEY}` //Input here your pass
    }
});

module.exports = transporter;