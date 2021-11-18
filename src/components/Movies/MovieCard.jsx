import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

import noPoster from '../../img/Question_mark.svg'

const monthNames = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May ',
  6: 'June',
  7: 'July ',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}

const dateCalculate = date => {
  if (date) {
    const dateCalc = date.split('-').reverse()
    dateCalc[1] = monthNames[parseInt(dateCalc[1])]

    return dateCalc.join(' ')
  }

  return '—'
}

const MovieCard = ({ movie }) => {
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : noPoster
  const green = 250 * movie.vote_average / 10
  const voteColor = `rgb(${250 - green}, ${green}, 0)`


  return (
    <>
      <div className='movie-card__link'>
        <Link to={`/movie/${movie.id}`}>
          <div className='movie-card__img-container'>
            <img src={poster} alt='movie' className='movie-card__poster'/>
            <p className='movie-card__vote-average' style={{ borderColor:voteColor }}>{ movie.vote_average }</p>
          </div>
          <p className='movie-card__title'>{ movie.title }</p>
        </Link>
      </div>

      <p className='movie-card__date'>{ dateCalculate(movie.release_date) }</p>
    </>
  );
};

export default MovieCard;