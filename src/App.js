import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import AddToFavourites from './components/AddToFavourites';
import RemoveFromFavourites from './components/RemoveFromFavourites';

const fetchMovies = async (query) => {
  const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=263d22d8`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.Search || [];};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const movieData = await fetchMovies(searchValue);
        setMovies(movieData);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [searchValue]);

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addToFavourites = (movie) => {
    const updatedFavourites = [...favourites, movie];
    setFavourites(updatedFavourites);
    saveToLocalStorage(updatedFavourites);
  };

  const removeFromFavourites = (movie) => {
    const updatedFavourites = favourites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavourites(updatedFavourites);
    saveToLocalStorage(updatedFavourites);
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center mt-4">
      <h1>Movie Database</h1>  
    </div>
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <h1>Movies</h1>      
      </div>
      <div>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className='row'>
        {isLoading ? (
          <p>Loading movies...</p>
        ) : fetchError ? (
          <p>{fetchError}</p>
        ) : movies.length ? (
          <MovieList
            movies={movies}
            handleFavouritesClick={addToFavourites}
            favouriteComponent={AddToFavourites}
          />
        ) : (
          <p>No movies found.</p>
        )}
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
          <h1>Favourites</h1>  
      </div>

      <div className='row'>
        {favourites.length ? (
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFromFavourites}
            favouriteComponent={RemoveFromFavourites}
          />
        ) : (
          <p>No favourites added yet.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default App;
