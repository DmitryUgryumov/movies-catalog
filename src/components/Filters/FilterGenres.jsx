import React from 'react';
import {getMoviesList} from "../../api/api";

const FilterGenres = ({ genresItems, setGenresItems, setGenres, setIsLoaded, setPage, setMovies, setError, sorted }) => {

  const changeGenres = (id, checked) => {
    let newGenres = genresItems.map(genre => genre.id.toString() === id ? { ...genre, checked: checked } : { ...genre })
      .filter(genre => genre.checked)
      .map(genre => genre.requestValue.toString())

    newGenres = newGenres.length ? `with_genres=${newGenres.join(',')}` : null

    sessionStorage.setItem('genres', newGenres)

    setGenres(newGenres)
    setIsLoaded(false)
    setPage(1)

    getMoviesList(1, sorted, setMovies, setError, setIsLoaded, newGenres)
  }

  const inputHandler = (e) => {

    setGenresItems(prev => prev.map(item => {
        return item.requestValue.toString() === e.target.value
          ? {...item, checked: !item.checked}
          : {...item}
      }
    ))

    changeGenres(e.target.id, e.target.checked)

  }

  return (
    <ul className='genres__ul'>
      {
        genresItems.map(item => (
            <li key={item.id} className='genres__li'>
              <input id={item.id} type="checkbox" name='genres' value={item.requestValue} checked={item.checked} onChange={inputHandler}/>
              <label htmlFor={item.id}>{item.description}</label>
            </li>
          )
        )
      }
    </ul>
  );
};

export default FilterGenres;