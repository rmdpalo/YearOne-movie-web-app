import React, { useState } from "react";

export default function SearchMovies() {
  // states- input query, movies, thumbs up and down
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const url = `https://api.themoviedb.org/3/search/movie?api_key=b3a59c78efdf98ef1c970832608f6b41&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name:
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. The Lego Movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
            <img
              className="card--image"
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
              alt={movie.title + " poster"}
            />
            <div className="card--content">
              <h3 className="card--title">{movie.title}</h3>
              <p className="card--release-date">
                <small>Released: {movie.release_date}</small>
              </p>
              <p className="card--overview">
                <small>{movie.overview}</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
//The movie detail page should have the following information at a minimum:
// Title
// Director
// Release Year
// Description (if your API provides it)
// Ability to thumbs up or thumbs down the movie (see below)
