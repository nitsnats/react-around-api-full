const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { LINK_REGEXP } = require('../constants/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },
  about: {
    type: String,
    default: "Explorer",
    required: [true, 'The "About" field must be filled in'],
    minlength: [2, 'The minimum length of about is 2'],
    maxlength: [30, 'The maximum length of about is 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    required: [true, 'The "Avatar" field must be filled in'],
    validate: {
      validator(v) {
        return LINK_REGEXP.test(v);
      },
      message: 'Sorry. the link is not valid!',
    },
  },
  email: {
    type: String,
    required: [true, 'The "email" field must be filled in'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },
  password: {
    type: String,
    required: [true, 'The "password" field must be filled in'],
    minlength: [8, 'The minimum length of about is 8'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password,) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user; // now user is available
        });
    });
};

userSchema.methods.toJSON = function () {
  const { password, ...obj } = this.toObject();
  return obj;
};

module.exports = mongoose.model('user', userSchema);
