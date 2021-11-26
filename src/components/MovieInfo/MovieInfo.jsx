import React from 'react'

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

//property check functions:
const checkStr = property => property ? property : '—'

const checkArr = arr => Array.isArray(arr) && arr.length
  ? arr.map(item => <span className='info__span' key={item.id || item.name}>{ item.name }</span>)
  : '—'

//calculate functions:
const timeCalculate = time => time ? `${Math.floor(time / 60)}h ${time % 60}min` : '—'

const numberCalculate = (n, symbol = '') => n ? n.toLocaleString() + ` ${symbol}` : '—'

const dateCalculate = date => {
  if (date) {
    const dateCalc = date.split('-').reverse()
    dateCalc[1] = monthNames[parseInt(dateCalc[1])]

    return dateCalc.join(' ')
  }

  return '—'
}

const MovieInfo = ({ movie }) => {
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : noPoster

  return (
    <div className='movie__info info'>
      <div className='info__img'>
        <img src={poster} alt='movie' className='info__poster'/>
      </div>

      <div className='info__description'>
        <p className='info__title'>{ movie.title }</p>
        {
          movie.overview
            ? <p className='info__overview'>{ movie.overview }</p>
            : null
        }
        <ul className='info__ul'>

          <li className='info__li'>
            <p>Tagline: </p>
            <p className='info__tagline'>{ checkStr(movie.tagline) }</p>
          </li>

          <li className='info__li'>
            <p>Rating: </p>
            <p className='info__rating'>{ `${checkStr(movie.vote_average)} (${numberCalculate(movie.vote_count, 'votes')})` }</p>
          </li>

          <li className='info__li'>
            <p>Genres: </p>
            <p className='info__genres'>{ checkArr(movie.genres) }</p>
          </li>

          <li className='info__li'>
            <p>Production countries:</p>
            <p className='info__countries'>{ checkArr(movie.production_countries) }</p>
          </li>

          <li className='info__li'>
            <p>Budget: </p>
            <p className='info__budget'>{ `${numberCalculate(movie.budget, '$')}` }</p>
          </li>

          <li className='info__li'>
            <p>Revenue: </p>
            <p className='info__revenue'>{ `${numberCalculate(movie.revenue, '$')}` }</p>
          </li>

          <li className='info__li'>
            <p>Runtime:</p>
            <p className='info__runtime'>{ timeCalculate(movie.runtime) }</p>
          </li>

          <li className='info__li'>
            <p>Realise date:</p>
            <p className='info__release_date'>{ dateCalculate(movie.release_date) }</p>
          </li>

          <li className='info__li'>
            <p>Status:</p>
            <p className='info__status'>{ checkStr(movie.status) }</p>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default MovieInfo