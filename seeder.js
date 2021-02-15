const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors')
require('dotenv').config();


// Load models
const User = require('./models/User');
const Profile = require('./models/Profile');

// Connect to DB
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const profiles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/profiles.json`, 'utf-8')
);

// const users = JSON.parse(
//     fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
//   );

// Import into DB
const importData = async () => {
  try {
    await Profile.create(profiles);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Profile.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}