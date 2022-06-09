const Movie = require('../models/movieModel');
const fs = require('fs/promises');

// Error handling

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `watchlistController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in watchlistController.${method}. Check server logs for more details.`,
    },
  };
};

//----------------------------------------------------------------

// watchlist Controller
// getall movies / add movie / delete movie

// add movie
const watchlistController = {
  async addWatchlistMovie(req, res, next) {
    try {
      const { title, genre, rating, releaseYear, summary, posterImg } =
        req.body;

      // movie.create is a method built into the mongoose model object
      const movie = await Movie.create({
        title,
        genre,
        rating,
        releaseYear,
        summary,
        posterImg,
      });
      res.locals.movie = movie;
      console.log(res.locals, 'this is res locals inside add watchlist movie');
      next();
    } catch (err) {
      next(
        createErr({
          method: 'addWatchlistMovie',
          type: JSON.stringify(err),
          err: err,
        })
      );
    }
  },

  async deleteWatchlistMovie(req, res, next) {
    try {
      const { id } = req.params;

      //.exec converts into a promise object
      const movie = await Movie.deleteById(id).exec();
      next();
    } catch (err) {
      next(
        createErr({
          method: 'deleteWatchlistMovie',
          type: JSON.stringify(err),
          err: err,
        })
      );
    }
  },

  async getWatchlist(req, res, next) {
    // fetch data from watchlist and set to res.locals.watchlist
    try {
      const watchlist = await Movie.find({}).exec();
      res.locals.watchlist = watchlist;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'getWatchlist',
          type: JSON.stringify(err),
          err: err,
        })
      );
    }
  },
};

module.exports = watchlistController;
