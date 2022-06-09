import React from 'react';

// NEVER use arrow function here for Components
// we should always use export default for our components.

const IMG_API = 'https://image.tmdb.org/t/p/w1280'; // 400 or 1280

function Movie({
  title,
  poster_path,
  overview,
  vote_average,
  release_date,
  video,
  genre_ids,
}) {
  const genres_movies =
    '{ "genres": [ { "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" } ] }';

  //refactor later
  const genreNameFromId = (idGen) => {
    let genreName = '';
    let obj = JSON.parse(genres_movies);
    for (let i = 0; i < obj.genres.length; i++) {
      if (idGen == obj.genres[i].id) {
        genreName = obj.genres[i].name;
        break;
      }
    }
    return genreName;
  };

  //refactor later
  const genreName = (gensArrayIds) => {
    let genre = '';
    const sizeGenresArray = gensArrayIds.length;
    for (let i = 0; i < sizeGenresArray; i++) {
      genre += ', ' + genreNameFromId(gensArrayIds[i]);
    }
    genre = genre.substr(1);
    return genre;
  };

  const genres = genreName(genre_ids);
  const releaseYear = release_date.slice(0, 4);

  //changes color of movie rating
  const setVoteClass = (vote_average) => {
    if (vote_average >= 8) return 'green';
    else if (vote_average >= 6) return 'yellow';
    else return 'red';
  };

  return (
    <div className="movie">
      <img
        src={
          poster_path
            ? IMG_API + poster_path
            : 'https://www.reelviews.net/resources/img/default_poster.jpg'
        }
        alt={`${title} poster `}
      />
      <div className="movie-info">
        <h3>{`${title} (${releaseYear})`}</h3>
        <span className={`tag ${setVoteClass(vote_average)}`}>
          {`${vote_average}/10`}
        </span>
      </div>
      <div className="movie-overview">
        <h2>Movie Info</h2>
        <h3>Genres:</h3>
        <p>{genres}</p>
        <h3>Storyline:</h3>
        <p>{overview}</p>
      </div>
    </div>
  );
}

export default Movie;
