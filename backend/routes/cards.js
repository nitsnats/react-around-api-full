const router = require('express').Router();

// const fs = require('fs').promises;

// const path = require('path');

// const cardsPath = path.join(__dirname, '../data/cards.json');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCard,
  validateId,
} = require('../middlewares/validators');

router.get('/cards', getCards);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:cardId', validateId, deleteCard);
router.put('/cards/:cardId/likes', validateId, likeCard);
router.delete('/cards/:cardId/likes', validateId, dislikeCard);

// router.get('/cards', (req, res) => {
//   fs.readFile(cardsPath, { encoding: 'utf8' })
//     .then((cards) => {
//       res.status(200).send({ data: JSON.parse(cards) });
//     })
//     .catch(() => res.status(500).send({ message: 'got an error!' }));
// });

module.exports = router;
