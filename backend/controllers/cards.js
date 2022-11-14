const Card = require('../models/card');
// const statusCodes = require('../constants/error');

const {
  ER_MES_OK,
  ER_MES_CREATED,
  ER_MES_BAD_REQUEST,
  ER_MES_NOT_FOUND,
  ER_MES_INTERNAL_SERVER_ERROR,
} = require('../constants/error');

// GET
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(ER_MES_OK).send({ data: cards })) // 200
    .catch((err) => res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: err.message }, 'An error occured')); // 500
};

// DELETE
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error({ message: 'Card not found' });
      error.statusCode = ER_MES_NOT_FOUND; // 404
      throw error;
    })
    .then((card) => {
      res.status(ER_MES_OK).send({ message: 'Card has been deleted', card }); // 200
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ER_MES_BAD_REQUEST).send({ message: 'Invalid card Id' }); // 400
      } else if (err.status === 404) {
        res.status(ER_MES_NOT_FOUND).send({ message: err.message }); // 404
      } else {
        res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: err.message }); // 500
      }
    });
};

// POST
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  const owner = req.user.id;
  // console.log(req.user)
  // console.log(owner)

  Card.create({
    name,
    link,
    owner,
    // likes,
  })

    .then((card) => res.status(ER_MES_CREATED).send(card)) // 201
    .catch((err) => {
      console.log('err ===>', err)
      if (err.name === 'ValidationError') {
        //res.status(ER_MES_BAD_REQUEST).send({ message: 'Data format is incorrect' }); // 400
        res.status(400).send(err.message)
      } else {
        res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: err.message }); // 500
      }
    });
};

//   .orFail(() => {
//     const error = new Error("No card found with that id");
//     error.statusCode = 404;
//     throw error;
//   })
//   .then(card => {
//       res.status(200).send({ message: '', data: card })
//   })
//   .catch(err => {
//     if(err.name === 'CastError') {
//       res.status(400).send('Invalid format of Id')
//     } else if (err.status === 404) {
//       res.status(404).send({ message: err.message })
//     } else {
//       res.status(500).send({ message: "Something went worng" })
//     }
// });
// }

const updateLikes = (req, res, operator) => {
  const {cardId} = req.params;
  const userId = req.user.id;

// console.log('userId===>', userId)
// console.log('likes', likes)

  Card.findByIdAndUpdate(
    cardId,
    { [operator]: { likes: userId} },
    { new: true }
  )
      .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = ER_MES_BAD_REQUEST; // 400
      throw error;
    })
    .then((card) => {
      res.status(ER_MES_OK).send(card); // 200
    })
    .catch((err) => {
      console.log(err)
      if (err.name === 'CastError') {
        res.status(ER_MES_BAD_REQUEST).send({ message: 'Card id is incorrect' }); // 400
      } else if (err.status === 404) {
        res.status(ER_MES_NOT_FOUND).send({ message: err.message }); // 404
      } else {
        res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: 'An error occured' }); // 500
      }
    });
};

module.exports.likeCard = (req, res) => updateLikes(req, res, '$addToSet');
module.exports.dislikeCard = (req, res) => updateLikes(req, res, '$pull');
