const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const Admin = require('../../models/Admin');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// get user info
router.get('/', auth, async (req, res) => {
  try {
    //get user information from mongo with this decoded id and send back everything except password
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json(admin);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// login
router.post(
  '/',  async (req, res) => {
    const { username, password } = req.body;

    try {
      const admin = await Admin.findOne({ username }); //find user in db by email

      if (!admin) {
        return res
          .status(400)
          .json({ message: 'Invalid Credentials.' });
      }

      const isMatch = password === admin.password;

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: admin.id,
        },
      };
      console.log(admin)
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;