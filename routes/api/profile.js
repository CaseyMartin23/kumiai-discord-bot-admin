const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile =  require('../../models/Profile');
const User =  require('../../models/User');
const jwt = require('jsonwebtoken');

module.exports = router;
