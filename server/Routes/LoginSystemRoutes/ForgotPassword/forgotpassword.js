const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const connection = require('../../../Modules/Database/database');
const transporter = require('../../../Modules/Transporter/transporter');

router.post('/', async (req, res) => {
    if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(req.body.email)))
    {
        return res.status(400).json({error: 'Incorrect email'});
    }

    const email = req.body.email;

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 15);
    const formattedExpires = expires.toLocaleString('sv-SE', { hour12: false }).replace('T', ' ');

    try
    {
        const [emails] = await connection.query('SELECT email FROM users WHERE email = ?', [email]);

        if(emails.length !== 1)
        {
            return res.status(404).json({ error: "User does not exist" });
        }

        await connection.query('INSERT INTO passwordTokens (email, token, expiration_date) VALUES (?, ?, ?)', [email, token, formattedExpires]);
        
        const resetLink = `http://192.168.1.19:3000/reset-password?token=${token}`;

        await transporter.sendMail({
            from: 'YourDashboardMessages@gmail.com',
            to: email,
            subject: 'Password reset',
            html: `
                    <td align="center" valign="middle">
                        <table role="presentation" border="0" cellpadding="20" cellspacing="0" width="400" style="background:#fff; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.3); font-family: Arial, sans-serif; color:#222;">
                        <tr>
                            <td style="text-align:center;">
                            <p style="font-size:16px; margin-bottom:20px;">
                                Click the link to reset your password:
                            </p>
                            <a href="${resetLink}" target="_blank" rel="noopener noreferrer" style="
                                display:inline-block; 
                                background-color:#da1212; 
                                color:#fff; 
                                text-decoration:none; 
                                padding:10px 18px; 
                                border-radius:4px; 
                                font-weight:bold; 
                                margin-bottom:20px;
                            ">
                                Reset Password
                            </a>
                            <p style="font-size:14px; color:#555;">
                                Link expires in 15 minutes.
                            </p>
                            </td>
                        </tr>
                        </table>
                    </td>
                `
        });

        return res.status(200).json({ message: "Token added, email sended" });
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({ error: err});
    }
});

module.exports = router;