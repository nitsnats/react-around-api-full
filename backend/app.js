const express = require('express');
//require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('express').Router();
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');


const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
// mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');



app.use('/cards', require('./routes/cards'));

// app.use((req, res, next) => {
//   req.user = {
//     // _id: '5d8b8592978f8bd833ca8133'
//     _id: '6320767512b05924a6b6f90c',
//   };
//   next();
// });

app.use(userRouter);
app.use(cardRouter);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource was not found' });
});
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
