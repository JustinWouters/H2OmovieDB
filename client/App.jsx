// useEffect does ...
// useState does ...

import React, { useEffect, useState } from 'react';
// dont import ANYTHING in curly braces {} if it is a "default export" and you want to import it
// For default exports NEVER use curly brace (aka. import {Movie} from './Movie')
// whenever it is a normal export we MUST use curly braces
import Movie from './components/Movie';
import './stylesheets/styles.scss';
import bg from './assets/footer-bg.jpg';

/* Attempt to hide key getting from process.env
 
import { config } from 'dotenv';
config();
*/

//const KEY = process.env.REACT_APP_API_KEY;

console.log('hello justin from App.jsx');
//console.log(process.env.REACT_APP_API_KEY);
console.log('--------------------------------');

/*
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

API_KEY=2fe6af2ee1ae842b08d3ad9730cc83a9
 */

// API related - MUST HIDE KEY Later In another File?

const KEY = '2fe6af2ee1ae842b08d3ad9730cc83a9';

const FEATURED_MOVIES_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

function App() {
  // const movieList = ['1', '2', '3'];

  // By default we have an empty array of no movies, and we will set the movies when we use the API. For this we need to use the useEffect React Hook and call the API from inside it.

  // State
  const [movieList, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Displays Featured Movies on Page Load
  useEffect(() => {
    getMovies(FEATURED_MOVIES_API);
  }, []);

  // SEARCH BAR FUNCTIONALITY

  const getMovies = (API) => {
    fetch(FEATURED_MOVIES_API)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
  };

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setMovies(data.results);
        });
    }
  }, [searchTerm]);

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <header>
          <input
            className="search-bar"
            type="text"
            placeholder="Search Movies..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </header>
      </form>
      <div
        className="movie-container"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {movieList.length > 0 &&
          movieList.map((movie) => <Movie key={movie.id} {...movie} />)}
        <h1>Hello World! {new Date().toString()}</h1>
      </div>
    </>
  );
}

export default App;
