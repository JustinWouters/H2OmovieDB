/**
 * Make fetch to my own api
 * fetch (/watchlist) -which will go into my controller which will query database, and then return back watchlist
 * put that into my state and use it to render watchlist
 *
 *
 * information I need to track (watchlists) comes from My own API,
 *
 *
 * display watchlist from state or display from my database?
 *
 * SETUP
 * have watchlist have a state
 * whenever the state changes, make fetch call to movies API and get information from 3rd party database to display those movies
 * Track the ID's (titles) of movies in my watchlist
 *
 * in getMovies try to console log first result to see structure of data (from App.jsx), console log in last .then data.results[0]
 *
 * Watchlist component should have state, (ids of movies) that are in the watchlist
 * anytime a movie is added and the state changes, make fetch call to movies API and get information from 3rd party database and get movies by their id
 *
 * wathclist will have ID state, or have props from ID's passed down into it and when props changes, make new fetch api call to get new information about movies, and store those movies in its state
 *
 * it will be similar to how we get movies from search, but instead watchlist will have state or take in through props the IDs that are in the watchlist, and when that state / props changes, make new fetch call to api and get new information about movies by their ID
 *
 * we could reafactor get movies function in app to take a list of IDs and it would functon the same if we dont pass the IDS but and we could pass that fnction to watchlist through props.
 *
 * Pass getMovies to watchlist from props, and take optional ID parameter, and if it does have Ids then it only gets movies by that.
 *
 * How to pass it through props from App.jsx?
 * Instead of having button, we can make watchlist component in App.jsx, and instead render the watchlist component which would ALSO have a hidden section that would display the watchlist when we click the button.
 * App would have IDs of movies and watchlist and pass it down to watchlist props so that watchlist has those ids
 * whenever that changes, then watchlist will make a fetch request to get info from those ID'd movies and update watchlist movie state.
 *
 *
 *
 *
 * New recommendations
 * Watchlist should make fetch request to my own API, from whichever endpoint (get watchlist movies)
 *
 * USE... Fetch (/watchlist) and that would hit our watchlist endpoint, which will go into associated contorller, and that will query our database, and then return back the watchlist!
 * Now we just put that into state and use that to render watchlist.
 *
 * Displayed data from movie looks like this
adult: false
backdrop_path: "/7ucaMpXAmlIM24qZZ8uI9hCY0hm.jpg"
genre_ids: (3) [14, 12, 28]
id: 338953
original_language: "en"
original_title: "Fantastic Beasts: The Secrets of Dumbledore"
overview: "Professor Albus Dumbledore ..."
popularity: 5488.223
poster_path: "/jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg"
release_date: "2022-04-06"
title: "Fantastic Beasts: The Secrets of Dumbledore"
video: false
vote_average: 6.8
vote_count: 1592
 *
 */

import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';
import './stylesheets/styles.scss';

function Watchlist() {
  // have state of movie IDs
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const getMovies = (API) => {
      fetch('/watchlist')
        .then((res) => res.json())
        .then((data) => {
          console.log(
            data.results[0],
            'this is my result from fetch in Watchlist'
          );
          setMovies(data.results);
        });
    };

    getMovies();
  }, []);

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
          <button className="my-watchlist">My Watchlist</button>
        </header>
      </form>
      <div className="watchlist">
        {watchlist.length > 0 &&
          watchlist.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default Watchlist;
