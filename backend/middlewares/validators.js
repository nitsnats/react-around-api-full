const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const { LINK_REGEXP } = require('../constants/regex');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Login validation
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.empty': 'The "email" field must be filled in',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'The minimum length of the "about" field is 8',
        'string.empty': 'The "password" field must be filled in',
      }),
  }),
});

// User validation
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "about" field is 2',
        'string.max': 'The maximum length of the "about" field is 30',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'The minimum length of the "about" field is 8',
        'string.empty': 'The "password" field must be filled in',
      }),
    email: Joi.string().required().email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.empty': 'The "email" field must be filled in',
      }),
    avatar: Joi.string().pattern(LINK_REGEXP)
      .message('The "avatar" field must be a valid URL'),
  }),
});

// Profile validation
const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.empty': 'The "name" field must be filled in',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "about" field is 2',
        'string.max': 'The maximum length of the "about" field is 30',
        'string.empty': 'The "about" field must be filled in',
      }),
  }),
});

// Avatar validation
const validateAvatar = celebrate({
  body: {
    avatar: Joi.string().required().pattern(LINK_REGEXP)
      .message('The "avatar" field must be a valid URL')
      .messages({
        'string.empty': 'The "avatar" field must be filled in',
      }),
  },
});

// Card validation
const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.empty': 'The "name" field must be filled in',
      }),
    link: Joi.string().required().pattern(LINK_REGEXP)
      .message('The "link" field must be a valid URL')
      .messages({
        'string.empty': 'The "link" field must be filled in',
      }),
  }),
});

// Id card validation
const validateId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid id');
    }),
  }),
});

// Id user validation
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid id');
    }),
  }),
});

module.exports = {
  validateURL,
  validateId,
  validateUserId,
  validateCard, // router.post('/cards', validateCard, createCard);
  validateUser, // app.post('/signup', validateUser, createUser);
  validateLogin, // app.post('/signin', validateLogin, login);
  validateAvatar,
  validateProfile,
};
