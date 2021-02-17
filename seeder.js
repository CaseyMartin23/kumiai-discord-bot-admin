const fs = require('fs');
const mongoose = require('mongoose');

// const Achievement = require('./models/Achievement');
// const QuestTemplate = require('./models/QuestTemplate');
// const Admin = require('./models/Admin');
const Passive = require('./models/Passive');
const Rank = require('./models/Rank');

mongoose.connect('mongodb+srv://tysin:tysin@cluster0.dx5ui.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

//read file synchronously (till read completion)
const ranks = JSON.parse(fs.readFileSync(`${__dirname}/_data/ranks.json`));
const passive = JSON.parse(fs.readFileSync(`${__dirname}/_data/passive.json`));

const importData = async () => {
  try {
    // await Achievement.deleteMany();
    // await Achievement.create(achievements);

    // await QuestTemplate.deleteMany();
    // await QuestTemplate.create(quests);

    // await Admin.deleteMany();
    // await Admin.create(admin);

    await Rank.deleteMany();
    await Rank.create(ranks);

    // await Passive.deleteMany();
    // await Passive.create(passive);

    console.log('Dummy data created');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
}