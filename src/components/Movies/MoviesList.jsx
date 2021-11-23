import React, {useEffect} from 'react';
import MovieCard from "./MovieCard";

const MoviesList = ({ movies }) => {
  return (
    <ul className='movies__list'>
      {
        movies.length
          ? movies.map(movieItem => {
            return <li className='movies__item movie-card' key={movieItem.id}>
              <MovieCard movie={movieItem}/>
            </li>
          })
          : <div>No film</div>
      }

    </ul>
  );
};

export default MoviesList;