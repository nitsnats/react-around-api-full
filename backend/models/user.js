const mongoose = require('mongoose');
const { LINK_REGEXP } = require('../constants/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },
  about: {
    type: String,
    required: [true, 'The "About" field must be filled in'],
    minlength: [2, 'The minimum length of about is 2'],
    maxlength: [30, 'The maximum length of about is 30'],
  },
  avatar: {
    type: String,
    required: [true, 'The "Avatar" field must be filled in'],
    validate: {
      validator(v) {
        return LINK_REGEXP.test(v);
      },
      message: 'Sorry. the link is not valid!',
    },
  },
});
module.exports = mongoose.model('user', userSchema);
