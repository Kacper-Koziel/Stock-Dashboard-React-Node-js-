const express = require('express');
const router = express.Router();
const connection = require('../../../Modules/Database/database');
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    const regexs = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        username: /^[a-zA-Z0-9._\- ]{4,20}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/
    };

    const errors = {};

    for(const key in regexs)
    {
        if(!regexs[key].test(req.body[key].trim()))
        {
            errors[key] = `${key} is incorrect`;
        }
    }

    if(Object.keys(errors).length > 0)
    {
        return res.status(400).json({ errors });
    }

    try
    {
        const [users] = await connection.query('SELECT * FROM `users` WHERE email = ?', [req.body.email]);

        if(users.length > 0)
        {
            return res.status(409).json({ error: "User with such an email already exist" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await connection.query('INSERT INTO `users` (username, email, password) VALUES (?, ?, ?)', [req.body.username, req.body.email, hashedPassword]);

        return res.status(201).json({ message: "Successfully added new user"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ err: 'Database error' });
    }


});

module.exports = router;