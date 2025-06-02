const express = require('express')
const router = express.Router();
const connection = require('../Database/database')

router.post('/', (req, res) => {
    const token = req.body.token;

    if(!token)
    {
        return res.status(400).json({ err: 'Token is null' });
    }

    const searchForToken = "SELECT isActive from loggedtokens WHERE token = ?";

    connection.query(searchForToken, [token], (err, results) => {
        if(err)
        {
            console.log(err);
            return res.status(400).json({ err: 'Querry error' });
        }

        if(results.length !== 1)
        {
            return res.status(400).json({ err: 'Token does not exist' });
        }

        return res.status(200).json({ isActive: results[0].isActive });

    });
});

module.exports = router;