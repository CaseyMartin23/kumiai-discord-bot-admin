const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

module.exports = function (req, res, next) {
  //Get token from request header
  if (!req.headers.authorization) return res.status(401).json({ msg: 'No token, authorization denied' });
  const token = req.headers.authorization.split(' ')[1]; //header key that we send the token in
  // console.log(req.headers.authorization)
  // If the token doesn't exist, the user is unauthorized
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user; //set user id equal to decoded jwt user id
    next();
  } catch (err) {
    console.error('Invalid auth');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
