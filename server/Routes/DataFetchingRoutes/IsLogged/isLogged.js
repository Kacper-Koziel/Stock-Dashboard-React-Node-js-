const express = require('express')
const router = express.Router();
const connection = require('../../../Modules/Database/database')

router.post('/', async (req, res) => {
    const token = req.body.token;

    if(!token)
    {
        return res.status(400).json({ err: 'Token is null' });
    }

    try 
    {
        const [results] = await connection.query('SELECT isActive from loggedtokens WHERE token = ?', [token]);

        if(results.length !== 1)
        {
            return res.status(400).json({ err: 'Token does not exist' });
        }

        return res.status(200).json({ isActive: results[0].isActive });
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({ error: err});
    }

});

module.exports = router;