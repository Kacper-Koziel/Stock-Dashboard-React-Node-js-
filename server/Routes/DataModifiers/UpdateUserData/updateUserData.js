const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const connection = require('../../../Modules/Database/database')

const storageDir = path.join(__dirname, '../../../STORAGE/profile_images');

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
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9._\- ]{4,20}$/;

router.post('/', upload.single('image'), async (req, res) => {

  if(!req.body.id)
  {
    return res.status(400).json({ error: 'No id' });
  }

  const updates = [];
  const vals = [];

  try
  {
    const [rows] = await connection.query("SELECT email, username FROM users WHERE id = ?", [req.body.id]);
    const userdata = rows[0];

    if(!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    if(emailRegex.test(req.body.email) && req.body.email !== userdata.email)
    {
      const [emails] = await connection.query("SELECT * FROM users WHERE email = ?", req.body.email);

      if(emails.length === 0)
      {
        updates.push("email = ?");
        vals.push(req.body.email);
      }
    }

    if(usernameRegex.test(req.body.username) && req.body.username !== userdata.username)
    {
      updates.push("username = ?")
      vals.push(req.body.username);
    }

    if(updates.length > 0)
    {
      vals.push(req.body.id);
      await connection.query(`UPDATE users SET ${updates.join(',')} WHERE id = ?`, vals);
    }

    return res.status(200).json({ message: "Changed" });
  }
  catch(err)
  {
    console.log(err);
    return res.status(400).json({ error: err});
  }
})

module.exports = router;