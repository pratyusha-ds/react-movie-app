import React from 'react';

const MovieList = ({ movies, handleFavouritesClick, favouriteComponent: FavouriteComponent }) => {
  if (!movies || movies.length === 0) {  
    return <p>No movies found.</p>;
  }

  return (
    <>
      {movies.map((movie, index) => (
        <div key={index} className='image-container d-flex justify-content-start m-3'>  
          <img src={movie.Poster} alt={movie.Title} />  
          <div
            onClick={() => handleFavouritesClick(movie)}
            className='overlay d-flex align-items-center justify-content-center'
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
