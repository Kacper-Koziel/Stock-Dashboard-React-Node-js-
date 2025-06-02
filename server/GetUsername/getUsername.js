const express = require('express');
const router = express.Router();
const connection = require('../Database/database');

router.post('/', (req, res) => {
    const token = req.body.token;

    const querry = "SELECT users.username, users.email FROM users JOIN loggedtokens ON users.ID = loggedtokens.ID_user WHERE loggedtokens.token = ?";

    connection.query(querry, [token], (err, results) => {
        if(err)
        {
            console.log(err);
            return res.status(400).json({ error: 'Querry error '});
        }

        if(results.length !== 1)
        {
            return res.status(400).json({ error: ' Username does not exist '});
        }

        return res.status(200).json({ username: results[0].username, email: results[0].email });
    })
})

module.exports = router;