import React from 'react'

import MovieCard from './MovieCard'

const MoviesList = ({ movies }) => {
  if (movies.length) {
    return (
      <ul className='movies__list'>
        {
          movies.map(movieItem =>
          <li className='movies__item movie-card' key={movieItem.id}>
            <MovieCard movie={movieItem}/>
          </li>
        )}
      </ul>
    )
  }

  return <div className='no-found'>No films found</div>
}

export default MoviesList