const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { errors } = require("celebrate");
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('express').Router();
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
//const { validateUser } = require('./middlewares/validators');
const { validateLogin } = require('./middlewares/validators');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
// mongoose.connect('mongodb://localhost:27017/aroundb');



app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.get('/alive',(req,res)=>{
  res.send('im alive')
})

app.post('/signup', validateLogin, createUser);
app.post('/signin', validateLogin, login);

//app.use(express.static(path.resolve(__dirname, '../frontend/build')))

app.use(auth);

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

//app.use('/cards', require('./routes/cards'));

// app.use((req, res, next) => {
//   req.user = {
//     // _id: '5d8b8592978f8bd833ca8133'
//     _id: '6320767512b05924a6b6f90c',
//   };
//   next();
// });

app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

// app.use('/', (req, res) => {
//   res.status(404).send({ message: 'Requested resource was not found' });
// });
// app.use('/', router);

// app.use(errors());
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
