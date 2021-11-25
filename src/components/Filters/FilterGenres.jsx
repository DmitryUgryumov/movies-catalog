import React from 'react'

import { getMoviesList } from '../../api/api'

const FilterGenres = ({ genresList, setGenresList, setGenresActive, setIsLoaded, setPage, setMovies, setError, sortedActive, dateActive }) => {

  const change = e => {
    let newGenres = genresList.map(genre => genre.id.toString() === e.target.id ? { ...genre, checked: e.target.checked } : { ...genre })
      .filter(genre => genre.checked)
      .map(genre => genre.requestValue.toString())

    newGenres = newGenres.length ? `with_genres=${newGenres.join(',')}` : ''

    setGenresList(prev => prev.map(genre => {
        return genre.id.toString() === e.target.id
          ? {...genre, checked: !genre.checked}
          : {...genre}
      }
    ))

    sessionStorage.setItem('genres', JSON.stringify(newGenres))
    sessionStorage.setItem('scroll', JSON.stringify(0))

    setGenresActive(newGenres)
    setIsLoaded(false)
    setPage(1)

    getMoviesList(1, sortedActive, setMovies, setError, setIsLoaded, newGenres, dateActive)
  }

  return (
    <div className='genres'>
      <p className='genres__title'>Genres: </p>
      <ul className='genres__ul'>
        {
          genresList.map(item =>
            <li key={item.id} className='genres__li'>
              <input id={item.id} type="checkbox" name='genres' value={item.requestValue} checked={item.checked} onChange={change} />
              <label htmlFor={item.id}>{item.description}</label>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default FilterGenres