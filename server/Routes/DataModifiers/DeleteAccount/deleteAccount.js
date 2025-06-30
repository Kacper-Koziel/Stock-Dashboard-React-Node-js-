const express = require('express');
const router = express.Router();
const connection = require('../../../Modules/Database/database');

router.post('/', async (req, res) => {
    if(!req.body.email)
    {
        return res.status(400).json({ error: 'No data' });
    }

    try
    {
        await connection.query('DELETE FROM users WHERE email = ?', [req.body.email]);
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({ error: err });
    }

    return res.status(200).json({ message: 'Deleted' });

});

module.exports = router;