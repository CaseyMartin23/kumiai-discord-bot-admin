const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Admin = require('../../models/Admin');
const Achievement = require('../../models/Achievement');
const QuestInProgress = require('../../models/QuestInProgress');
const QuestTemplate = require('../../models/QuestTemplate');
const Rank = require('../../models/Rank');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const queryType = req.body.type;
    var data;

    if (queryType === 'ranks') {
       data = await Rank.find();
    }
    else if (queryType === 'quests') {
        data = await QuestTemplate.find();
    }
    else if (queryType === 'achievements') {
        data = await Achievement.find();
    }
    else if (queryType === 'users') {
        data = await User.find().select('-_id');
    }
    else if (queryType === 'passive') {
        // functionality hard coded in the bot as per requirements
        // data = await Rank.find();
    }
    console.log(req.body.type, data)
    if (!data) return res.status(400).json({ message: 'Something went wrong went fetching data.' });
    console.log(data)
    return res.status(200).json(data);
})

module.exports = router;
