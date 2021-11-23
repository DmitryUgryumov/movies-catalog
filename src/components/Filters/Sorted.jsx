import React, {useEffect} from 'react';
import {getMoviesList} from "../../api/api";

const Sorted = ({ sortedList, setSortedList, setSortedActive, setIsLoaded, setPage, setMovies, setError, genresActive, dateActive }) => {
  const changeSort = e => {
    const newSorted = sortedList.filter(item => item.id.toString() === e.target.id)[0].requestValue

    setSortedList(prev => prev.map(item => item.requestValue === newSorted
        ? {...item, checked: true}
        : {...item, checked: false}
      ))

    sessionStorage.setItem('sorted', newSorted)

    setSortedActive(newSorted)
    setIsLoaded(false)
    setPage(1)

    getMoviesList(1, newSorted, setMovies, setError, setIsLoaded, genresActive, dateActive)
  }

  return (
    <ul className='sorted__ul'>
      {
        sortedList.map(item => (
            <li key={item.id} className='sorted__li'>
              <input id={item.id} type="radio" name='sorted' value={item.requestValue} checked={item.checked} onChange={changeSort}/>
              <label htmlFor={item.id}>{item.description}</label>
            </li>
          )
        )
      }
    </ul>
  );
};

export default Sorted;