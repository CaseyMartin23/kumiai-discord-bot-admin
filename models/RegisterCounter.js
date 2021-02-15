const mongoose = require('mongoose');

const RegisterCounter = new mongoose.Schema({
    registrations: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('RegisterCounter', RegisterCounter);