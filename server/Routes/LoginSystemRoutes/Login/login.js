const express = require('express');
const router = express.Router();
const connection = require('../../../Modules/Database/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

    const regexs = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        username: /^[a-zA-Z0-9._\- ]{4,20}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/
    };


router.post('/', async (req, res) => {

    try
    {
        const errors = {};

        for(const key in regexs)
        {
            if(!req.body[key] || !regexs[key].test(req.body[key].trim()))
            {
                errors[key] = `${key} is incorrect`;
            }
        }

        if(Object.keys(errors).length > 0)
        {
            return res.status(400).json({ errors });
        }

        const [results] = await connection.query('SELECT * FROM `users` WHERE email = ? AND username = ?', [req.body.email, req.body.username]);

        if(results.length === 0)
        {
            return res.status(404).json({ error: 'User does not exist' });
        }

        if (!(await bcrypt.compare(req.body.password, results[0].password))) 
        {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = crypto.randomBytes(32).toString('hex');

        await connection.query('INSERT INTO loggedtokens (ID_user, token, isActive) VALUES (?, ?, ?)', [results[0].ID, token, true]);

        return res.status(200).json({ message: 'User logged successfully', token });
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({ error: err});
    }
})

module.exports = router;