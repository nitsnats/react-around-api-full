const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'An error has occurred on the server' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;

// app.use((err, req, res, next) => {
//   // if an error has no status, display 500
//   const { statusCode = 500, message } = err;
//   res
//     .status(statusCode)
//     .send({
//       // check the status and display a message based on it
//       message: statusCode === 500
//         ? 'An error occurred on the server'
//         : message
//     });
// });
