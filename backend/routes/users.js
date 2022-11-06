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

router.get('/users/me', createUser);
router.get('/users', getUsers);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users/:userId', getUser);

module.exports = router;
