const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const User =  require('../../models/User')
const sgMail = require('@sendgrid/mail')
const baseUrl = 'https://match-app-node.herokuapp.com'
const RegisterCounter = require('../../models/RegisterCounter')
 
module.exports = router;
 

