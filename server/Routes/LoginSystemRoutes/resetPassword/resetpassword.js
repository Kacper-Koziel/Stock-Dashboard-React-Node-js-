const express = require('express')
const router = express.Router();
const connection = require('../../../Modules/Database/database');
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/.test(req.body.password)))
    {
        return res.status(400).json({ error: 'Incorrect password' });
    }

    try
    {
        const results = await connection.query("SELECT email, expiration_date FROM passwordtokens WHERE token = ?", [req.body.token]);

        if(results.length !== 1)
        {
            return res.status(400).json({ error: 'Token error' });
        }

        if (results[0].expiration_date.getTime() < Date.now()) {
            return res.status(400).json({ error: 'Token has expired' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const updateQuery = await connection.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, results[0].email]);
    
        return res.status(200).json({ message: 'Password hanged' });
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ err: 'Database error' });
    }
});

module.exports = router;