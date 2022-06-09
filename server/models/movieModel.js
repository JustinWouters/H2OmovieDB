const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  genre: String,
  rating: Number,
  releaseYear: Number,
  summary: { type: String, required: true },
  posterImg: { type: String, required: true },
  // trailerLink: String,
});

module.exports = mongoose.model('movie', movieSchema);
