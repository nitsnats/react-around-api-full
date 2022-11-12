const mongoose = require('mongoose');
const { LINK_REGEXP } = require('../constants/regex');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },
  link: {
    type: String,
    required: [true, 'The "Link" field must be filled in'],
    validate: {
      validator(v) {
        return LINK_REGEXP.test(v);
      },
      message: 'Sorry. the link is not valid!',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'The "Owner" field must be filled in'],
    minlength: 2,
    maxlength: 30,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model('card', cardSchema);
