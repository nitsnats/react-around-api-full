const router = require('express').Router();
// const fs = require('fs').promises;
// const path = require('path');

// const usersPath = path.join(__dirname, '../data/users.json');

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

// router.get('/users', (req, res) => {
//   fs.readFile(usersPath, { encoding: 'utf8' })
//     .then((data) => {
//       res.status(200).send({ data: JSON.parse(data) });
//     })
//     .catch(() => res.status(500).send({ message: 'Users Not Found' }));
// });

// router.get('/users/:id', (req, res) => {
//   const { id } = req.params;

//   fs.readFile(usersPath, { encoding: 'utf8' })
//     .then((users) => JSON.parse(users).find((user) => user._id === id))
//     .then((user) => {
//       if (user) {
//         res.status(200).send(user);
//       } else {
//         res.status(404).send({ message: 'User ID not found' });
//       }
//     })
//     .catch(() => res.status(500).send({ message: 'Got an error!' }));
// });

module.exports = router;
