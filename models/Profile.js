const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    },
    matches: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          }
      },
      ],
  selections: [
  {
    question: { type: String, required: true },
    answer: { type: String, required: true, enum: ['strongly disagree', 'disagree', 'neutral', 'agree', 'strongly agree'] },
  },
  ],
  industries: [
    {
      answer: { type: String, required: true, enum: ['agriculture', 'apparel/fashion', 'arts, entertainment and recreation', 'business', 'construction', 'education', 'finance', 'food and grocery', 'healthcare/medicine', 'insurance', 'manufacturing', 'mining', 'oil/gas', 'power generation/storage', 'real estate and rental/leasing', 'research', 'retail/wholesale goods', 'pharmaceutical', 'technology and information', 'telecommunication', 'transportation' ]}
    },
    ],
  type: {
    type: String,
    required: true,
    enum: ['socializing', 'academics/career']
  },
  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th', '5th or more']
  },
  discipline: {
    type: String,
    required: true,
    enum: ["none - i'm in first year", "software", "mechanical", "chemical", "integrated", "mechatronics", "electrical", "computer", "civil"]
  },
  submitted: {
    type: Boolean,
  }
},{
  timestamps: true
}

);


module.exports = mongoose.model("Profile", ProfileSchema);

// Type: Socializing, Academics/Career
// What year are you in: 1st, 2nd, 3rd, 4th, 5th or more
// Which engineering discipline are you in?: None - I'm in first year, Software, Mechanical, Chemical, Integrated, Mechatronics, Electrical, Computer, Green process, Civil
// General answer possibilities: strongly disagree, disagree, neutral, agree, strongly agree

