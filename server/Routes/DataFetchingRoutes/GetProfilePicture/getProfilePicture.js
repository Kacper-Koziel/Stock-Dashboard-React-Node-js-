const express = require('express')
const router = express.Router();
const connection = require('../../../Modules/Database/database')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '../../../STORAGE/profile_images');
const defaultImage = 'DefaultPic.png';

const isLogged = async (req, res, next) => {
    const token = req.query.token;
    const querry = "SELECT isActive FROM loggedTokens WHERE token = ?";

    try
    {
        const [isActive] = await connection.query('SELECT isActive FROM loggedTokens WHERE token = ?', [token]);

        if (isActive.length !== 1 || !isActive[0].isActive) {
            return res.status(401).json({ error: 'User is not logged in' });
        }

        next();
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({ error: err});
    }
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