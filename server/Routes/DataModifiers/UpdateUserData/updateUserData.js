const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const connection = require('../../../Modules/Database/database')

const storageDir = path.join(__dirname, '../STORAGE/profile_images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storageDir);
  },

  filename: function (req, file, cb) {
    const email = req.body.email;
    if (!email) return cb(new Error('No email'));

    const safeEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
    const ext = path.extname(file.originalname);
    cb(null, `${safeEmail}${ext}`);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {

  if(!req.id)
  {
    return res.status(400).json({ error: 'No id' });
  }

  const checkQuery = "SELECT email, username FROM users WHERE id = ?";

  

  // if(req.email)
  // {
  //   const updateQuery = "UPDATE users SET email = ?. username = ? WHERE id = ?";
  //   connection.query()
  // }

    return res.status(200).json({ message: "Changed" });
})

module.exports = router;