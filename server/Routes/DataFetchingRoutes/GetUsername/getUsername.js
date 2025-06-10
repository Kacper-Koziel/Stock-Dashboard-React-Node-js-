const express = require('express');
const router = express.Router();
const connection = require('../../../Modules/Database/database');

router.post('/', async (req, res) => {
    const token = req.body.token;

    const querry = "SELECT users.username, users.email, users.id FROM users JOIN loggedtokens ON users.ID = loggedtokens.ID_user WHERE loggedtokens.token = ?";

    try
    {
        const [result] = await connection.query('SELECT users.username, users.email, users.id FROM users JOIN loggedtokens ON users.ID = loggedtokens.ID_user WHERE loggedtokens.token = ?', [token]);

        if(result.length !== 1)
        {
            return res.status(400).json({ error: ' Username does not exist '});
        }

        return res.status(200).json({ username: result[0].username, email: result[0].email, id: result[0].id });
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({ error: err});
    }
})

module.exports = router;