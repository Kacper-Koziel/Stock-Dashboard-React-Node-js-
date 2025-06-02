const express = require('express')
const router = express.Router();
const connection = require('../Database/database');
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/.test(req.body.password)))
    {
        return res.status(400).json({ error: 'Incorrect password' });
    }

    const selectionQuerry = "SELECT email, expiration_date FROM passwordtokens WHERE token = ?";

    connection.query(selectionQuerry, req.body.token, async (err, results) => {
        if(err)
        {
            return res.status(400).json({ error: 'Selection error' });
        }

        console.log(results);

        if(results.length !== 1)
        {
            return res.status(400).json({ error: 'Token error' });
        }

        console.log("Expiration date:", results[0].expiration_date);

        if (results[0].expiration_date.getTime() < Date.now()) {
            return res.status(400).json({ error: 'Token has expired' });
        }


        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const passwordQuerry = "UPDATE users SET password = ? WHERE email = ?";

        connection.query(passwordQuerry, [hashedPassword, results[0].email], async (err, results) => {
            if(err)
            {
                return res.status(400).json({ error: 'Altering password error' });
            }

            return res.status(200).json({ message: 'Password hanged' });
        });
    })

        
    
});

module.exports = router;