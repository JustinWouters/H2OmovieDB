const express = require('express');

const watchlistController = require('../controllers/watchlistController');

const router = express.Router();

// import { getWatchlist, addWatchlistMovie, deleteWatchlistMovie } from '../controllers/watchlistController';

router.get('/', watchlistController.getWatchlist, (req, res) => {
  return res.status(200).json(res.locals.watchlist);
});

router.post('/', watchlistController.addWatchlistMovie, (req, res) => {
  return res.status(200).send(res.locals.movie);
});

//
router.delete('/:id', watchlistController.deleteWatchlistMovie, (req, res) => {
  return res.status(200).send('deleted watchlist movie');
});

module.exports = router;

//----------------------------------------------------------------
// import { Router } from 'express';

// const router = Router();

// import {
//   getWatchlist,
//   addWatchlistMovie,
//   deleteWatchlistMovie,
// } from '../controllers/watchlistController';

// router.get('/', getWatchlist, (req, res) => {
//   return res.status(200).json(res.locals.watchlist);
// });

// router.post('/', addWatchlistMovie, (req, res) => {
//   return res.status(200).send(res.locals.movies);
// });
// s;
// //
// router.delete('/:id', deleteWatchlistMovie, (req, res) => {
//   return res.status(200).send('deleted watchlist movie');
// });

// export default router;
