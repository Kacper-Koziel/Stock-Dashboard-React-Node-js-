const express = require('express');
const router = express.Router();
const connection = require('../Database/database');
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

    const checkQuerry = 'SELECT * FROM `users` WHERE email = ?';

    connection.query(checkQuerry, [req.body.email], async (err, results) => {
        if(err) {
            console.error(err);
            return res.status(400).json({ error: "Internal database selection error, please try again" });
        }

        if(results.length > 0)
        {
            return res.status(409).json({ error: "User with such an email already exist" });
        }

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const insertQuerry = 'INSERT INTO `users` (username, email, password) VALUES (?, ?, ?)';

            connection.query(insertQuerry, [req.body.username, req.body.email, hashedPassword], (err, results) => {
                if(err) {
                    console.error(err);
                    return res.status(400).json({ error: "Insertion querry error, please try again" });
                }

                return res.status(201).json({ message: "Successfully added new user"});
            });
        } 
        catch(err)
        {
            console.error(err);
            return res.status(400).json({ error: "Password hashing error" });
        }
    });


});

module.exports = router;