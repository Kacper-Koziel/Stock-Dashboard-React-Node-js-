const express = require('express')
const router = express.Router();
const connection = require('../Database/database')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '../STORAGE/profile_images');
const defaultImage = 'defaultPic.png';

const isLogged = (req, res, next) => {
    const token = req.query.token;
    const querry = "SELECT isActive FROM loggedTokens WHERE token = ?";

    connection.query(querry, [token], (err, results) => {
        if(err) 
        {
            console.log(err);
            return res.status(400).json({ error: 'Query error' });
        }

        if (results.length !== 1 || !results[0].isActive) {
            console.log(results[0].isActive);
            return res.status(401).json({ error: 'User is not logged in' });
        }

        next();
    })
}

router.get('/', isLogged,  (req, res) => {
    const email = req.query.email

    if(!email) { return res.status(400).json({ error: 'No email' }); }

    const safeEmail = email.replace(/[^a-zA-Z0-9]/g, '_');

    const possibleFiles = [
        path.join(uploadDir, safeEmail + '.png'),
        path.join(uploadDir, safeEmail + '.jpg'),
        path.join(uploadDir, safeEmail + '.jpeg'),
        path.join(uploadDir, safeEmail + '.gif'),
    ];

    const fileExists = possibleFiles.find(filePath => fs.existsSync(filePath));

    if (fileExists) {
        return res.sendFile(fileExists);
    } 
    else {
        return res.sendFile(path.join(uploadDir, defaultImage));
    }
})

module.exports = router;