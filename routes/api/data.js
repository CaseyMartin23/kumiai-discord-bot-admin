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
const Passive = require('../../models/Passive');

router.get('/:type', async (req, res) => {
    const queryType = req.params.type;
    var data;
    if (queryType === 'ranks') data = await Rank.find();
    else if (queryType === 'quests') data = await QuestTemplate.find();
    else if (queryType === 'achievements') data = await Achievement.find();
    else if (queryType === 'users') data = await User.find();
    else if (queryType === 'passive') data = await Passive.find();
    if (!data) return res.status(400).json({ message: 'Something went wrong went fetching data.' });
    return res.status(200).json(data);
})

router.post('/', async (req, res) => {
    const { type, rank } = req.body;
    var updatedDoc;
    if (type === 'ranks') updatedDoc = await Rank.create(rank);
     if (!updatedDoc) return res.status(400).json({ message: 'Something went wrong completing that action.' });
     return res.status(200).json(updatedDoc);
})

router.put('/', async (req, res) => {
    const { select, type, newVal } = req.body;
    console.log(req.body)
    var updatedDoc;
    if (select === 'ranks') updatedDoc = await Rank.findOneAndUpdate({ _id: type }, newVal, { new: true });
     else if (select === 'quests') updatedDoc = await QuestTemplate.findOneAndUpdate({ type: type }, newVal, { new: true });
     else if (select === 'achievements') updatedDoc = await Achievement.findOneAndUpdate({ type: type }, newVal, { new: true });
     else if (select === 'users') updatedDoc = await User.findOneAndUpdate({ _id: type }, newVal, { new: true });
     else if (select === 'passive') console.log();
     console.log(updatedDoc)
     if (!updatedDoc) return res.status(400).json({ message: 'Something went wrong completing that action.' });
     return res.status(200).json(updatedDoc);
})

router.delete('/:type/:id', async (req, res) => {
    console.log(req.params.type, req.params.id);
    var deletedDoc;
    if (req.params.type === 'ranks') deletedDoc = await Rank.findByIdAndRemove(req.params.id);
    if (!deletedDoc) return res.status(404).json({ message: 'Something went wrong.' });
    console.log(deletedDoc)
    return res.status(200).json(deletedDoc._id);
})

module.exports = router;
