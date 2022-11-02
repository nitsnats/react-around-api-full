const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants/config');

// const { JWT_SECRET } = process.env;

// const statusCodes = require('../constants/error');
const {
  ER_MES_OK,
  ER_MES_CREATED,
  ER_MES_BAD_REQUEST,
  ER_MES_NOT_FOUND,
  ER_MES_INTERNAL_SERVER_ERROR,
} = require('../constants/error');
const { default: mongoose } = require('mongoose');

// GET
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(ER_MES_OK).send({ data: users })) // 200
    .catch((err) => res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: err.message })); // 500
};

// GET
module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error({ message: 'User not found' });
      error.statusCode = ER_MES_NOT_FOUND; // 404
      throw error;
    })
    .then((user) => {
      res.status(ER_MES_OK).send({ data: user }); // 200
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ER_MES_BAD_REQUEST).send({ message: 'Invalid user' }); // 400
      } else if (err.status === 404) {
        res.status(ER_MES_NOT_FOUND).send({ message: err.message }); // 404
      } else {
        res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: err.message }); // 500
      }
    });
};

// POST /signin
// module.exports.login = (req, res) => {
//   const { email, password } = req.body;

//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Incorrect password or email'));
//       }
//       return bcrypt.compare(password, user.password);
//     })
//     .then((matched) => {
//       if (!matched) {
//         // the hashes didn't match, rejecting the promise
//         return Promise.reject(new Error('Incorrect password or email'));
//       }
//       // successful authentication
//       res.send({ message: 'Everything good!' });
//     })
//     .catch((err) => {
//       res
//         .status(401)
//         .send({ message: err.message });
//     });
// };

module.exports.login = (req, res ) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch((err) => {
      console.log('line85=>', err)
      res.status(ER_MES_UNSUTHORIZED_ERROR).send({ message: err.message }); //401
    });
  };

// POST
module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
  .then((user) => {
    if (user) {
      res.status(ER_MES_CONFLICT_ERROR).send({ message:'The user with the provided email already exists'}); //409
    } else {
      return bcrypt.hash(password, 10);
    }
  })
  .then((hash) => User.create({
    email, password: hash, }))
    .then((user) => res.status(ER_MES_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email, }),
      ) // 201
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // res.status(ER_MES_BAD_REQUEST).send({ message: err.message }); // 400
        res.status(ER_MES_BAD_REQUEST).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
        // next(new ER_MES_BAD_REQUEST(`${Object.values(err.errors).map((error) => error.message)
        //   .join(', ')}`,
        // });
      } else {
        res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: 'An error occured' }); // 500
      }
    });
};

// module.exports.updateUserAvatar = (req, res) => {
//   const {avatar} = req.body

//   const id = req.user._id

//   if(!avatar) {
//     return res.status(400).send({message: 'avatar cant be empty'})
//   }

//   User.findByIdAndUpdate(id,{avatar}, {new: true})
//   .orFail(() => {
//     const error = new Error("No user found with that id");
//     error.statusCode = 404;
//     throw error;
//   })
//     .then(user => res.status(201).send({ data: user }))
//     .catch(err => {
//       if(err.name === 'CastError') {
//       res.status(400).send({ message: "The user id in not correct " })
//     } else if(err.status === 404) {
//       res.status(404).send({ message: err.message }, "at updateAvatar")
//     } else {
//       res.status(500).send({ message: "Something went wrong" })
//     }
// });
// }

// module.exports.updateUser = (req, res) => {

//   const {name, about} = req.body

//   const id = req.user._id
//   console.log('req =>', req)
//   if(!name || !about) {
//     return res.status(400).send({message: 'avatar cant be empty'})
//   }

//   User.findByIdAndUpdate(id,{name, job}, {new: true})
//   .orFail(() => {
//     const error = new Error("No user found with that id");
//     error.statusCode = 404;
//     throw error;
//   })
//     .then(user => res.status(201).send({ data: user }))
//     .catch(err => {
//       if(err.name === 'CastError') {
//       res.status(400).send({ message: "The user id in not correct " })
//     } else if(err.status === 404) {
//       res.status(404).send({ message: err.message })
//     } else {
//       res.status(500).send({ message: "Something went wrong" })
//     }
// });
// }

// PATCH
const updateUserData = (req, res) => {
  // const body = req.body
  const id = req.user._id;
  const { body } = req;

  User.findByIdAndUpdate(id, body, { runValidators: true })
    .orFail(() => {
      const error = new Error({ message: 'No user id not found' });
      error.statusCode = ER_MES_NOT_FOUND; // 404
      throw error;
    })
    .then((user) => res.status(ER_MES_CREATED).send({ data: user })) // 201
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ER_MES_BAD_REQUEST).send({ message: 'The user id in not correct' }); // 400
      } else if (err.status === 404) {
        res.status(ER_MES_NOT_FOUND).send({ message: err.message }); // 404
      } else {
        res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' }); // 500
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  // const id = req.user._id

  if (!avatar) {
    return res.status(ER_MES_BAD_REQUEST).send({ message: 'avatar cant be empty' }); // 400
  }

  return updateUserData(req, res);
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(ER_MES_BAD_REQUEST).send({ message: 'avatar cant be empty' }); // 400
  }

  return updateUserData(req, res);
};

//module.exports = mongoose.model('user', userSchema);