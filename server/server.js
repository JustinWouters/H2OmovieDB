const express = require('express');
const mongoose = require('mongoose');
const app = express();

const path = require('path'); // NEW TODAY 9th

const PORT = 3000;
// will tell server to load anything in file called .env -> into an environment variable
require('dotenv').config();

//console.log(process.env, 'this is my process env');
mongoose.connect(
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once('open', () => {
  console.log(`Connected to Database ${process.env.NODE_ENV}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//newly added today ************************************************

// needs access to file routes/watchlist.js
const watchlistRouter = require('./routes/watchlist');

// app.use('/')

// when /watchlist is visited, we will use watchlist Router
app.use('/watchlist', watchlistRouter);

// app.use('/user')

//newly added today end ********************************************

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// app will listen to PORT variable
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
