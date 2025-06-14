const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YourDashboardMessages@gmail.com', //Input here your email
        pass: 'dkby qfnv crwi utak' //Input here your pass
    }
});

module.exports = transporter;