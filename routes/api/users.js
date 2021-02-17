const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const Admin = require('../../models/Admin');
const baseUrl = ''
 
module.exports = router;
 

