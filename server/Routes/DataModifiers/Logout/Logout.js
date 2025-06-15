const express = require('express');
const router = express.Router();
const connection = require('../../../Modules/Database/database');

router.post('/', async (req, res) => {
    if(!req.body.token)
    {
        return res.status(400).json({ error: 'No token' });
    }

    try
    {
        await connection.query('UPDATE loggedTokens SET isActive = FALSE WHERE token = ?', [req.body.token]);

        return res.status(200).json({ message: 'Logged out' });
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ error: 'Database error' });
    }
})

module.exports = router;